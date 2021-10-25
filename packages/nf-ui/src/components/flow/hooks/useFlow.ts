import { useState, useCallback, useContext, createContext, useEffect } from 'react';

interface FlowOptions {
  stepLabels: string[];
  onComplete: () => Promise<unknown>;
}

interface FlowContextType {
  currentStep: number;
  navigateToStep: (step: number) => unknown;
}

export const FlowContext = createContext<FlowContextType | null>(null);

function useFlowContext(): FlowContextType {
  const ctx = useContext(FlowContext);
  if (!ctx) {
    throw new Error('Missing FlowContext');
  }
  return ctx;
}

export interface Flow {
  saving: boolean;
  nextStep: () => void;
  previousStep: () => void;
  currentStep: number;
  completedSteps: number[];
  stepLabels: string[];
}

export function useFlow({ stepLabels, onComplete }: FlowOptions): Flow {
  const { currentStep, navigateToStep } = useFlowContext();
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [saving, setSaving] = useState(false);
  const [isComplete, setComplete] = useState(false);

  const nextStep = useCallback(async () => {
    if (completedSteps.includes(currentStep) === false) {
      setCompletedSteps([...completedSteps, currentStep]);
    }
    // Not 0 index
    const currentStepNumber = currentStep + 1;
    if (stepLabels.length === currentStepNumber) {
      setComplete(true);
    } else {
      navigateToStep(currentStep + 1);
    }
  }, [currentStep, completedSteps, navigateToStep]);

  const previousStep = useCallback(() => {
    if (currentStep === 0) return;
    navigateToStep(currentStep - 1);
  }, [currentStep]);

  useEffect(() => {
    if (isComplete) {
      setSaving(true);
      onComplete().then(() => {
        setSaving(false);
      });
    }
  }, [isComplete]);

  return {
    saving,
    nextStep,
    previousStep,
    currentStep,
    completedSteps,
    stepLabels,
  };
}

interface ConditionalFlowOptions {
  totalSteps: number;
  onComplete: () => Promise<unknown>;
}

interface ConditionalFlow {
  saving: boolean;
  nextStep: (step: number) => void;
  previousStep: () => void;
  currentStep: number;
}

export function useConditionalFlow({ totalSteps, onComplete }: ConditionalFlowOptions): ConditionalFlow {
  const { currentStep, navigateToStep } = useFlowContext();
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [saving, setSaving] = useState(false);
  const [isComplete, setComplete] = useState(false);

  const nextStep = useCallback(
    async (step: number) => {
      if (completedSteps.includes(currentStep) === false) {
        setCompletedSteps([...completedSteps, currentStep]);
      }
      // Not 0 index
      const currentStepNumber = step;
      if (totalSteps === currentStepNumber) {
        setComplete(true);
      } else {
        navigateToStep(step);
      }
    },
    [currentStep, completedSteps, navigateToStep],
  );

  const previousStep = useCallback(() => {
    const lastStep = completedSteps.pop();
    if (currentStep === 0 || lastStep === undefined) return;
    navigateToStep(lastStep);
  }, [currentStep, completedSteps]);

  useEffect(() => {
    if (isComplete) {
      setSaving(true);
      onComplete().then(() => {
        setSaving(false);
      });
    }
  }, [isComplete]);

  return {
    saving,
    nextStep,
    previousStep,
    currentStep,
  };
}
