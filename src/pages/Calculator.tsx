import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calculator as CalcIcon } from "lucide-react";

export default function Calculator() {
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === "0" ? num : display + num);
    }
  };

  const inputOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue: number, secondValue: number, operation: string) => {
    switch (operation) {
      case "+": return firstValue + secondValue;
      case "-": return firstValue - secondValue;
      case "×": return firstValue * secondValue;
      case "÷": return firstValue / secondValue;
      case "=": return secondValue;
      default: return secondValue;
    }
  };

  const handleEquals = () => {
    const inputValue = parseFloat(display);
    
    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  const clear = () => {
    setDisplay("0");
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2 text-center">Calculator</h1>
        <p className="text-muted-foreground text-center">Scientific calculator for your studies</p>
      </motion.div>

      <Card className="shadow-elevated">
        <CardHeader>
          <CardTitle className="flex items-center justify-center gap-2">
            <CalcIcon className="h-5 w-5" />
            Basic Calculator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Display */}
          <div className="bg-muted/50 rounded-lg p-4 text-right">
            <div className="text-2xl font-mono overflow-hidden">{display}</div>
          </div>

          {/* Buttons */}
          <div className="grid grid-cols-4 gap-2">
            <Button variant="outline" onClick={clear} className="col-span-2">Clear</Button>
            <Button variant="outline" onClick={() => inputOperation("÷")}>÷</Button>
            <Button variant="outline" onClick={() => inputOperation("×")}>×</Button>

            <Button variant="outline" onClick={() => inputNumber("7")}>7</Button>
            <Button variant="outline" onClick={() => inputNumber("8")}>8</Button>
            <Button variant="outline" onClick={() => inputNumber("9")}>9</Button>
            <Button variant="outline" onClick={() => inputOperation("-")}>-</Button>

            <Button variant="outline" onClick={() => inputNumber("4")}>4</Button>
            <Button variant="outline" onClick={() => inputNumber("5")}>5</Button>
            <Button variant="outline" onClick={() => inputNumber("6")}>6</Button>
            <Button variant="outline" onClick={() => inputOperation("+")} className="row-span-2 h-auto">+</Button>

            <Button variant="outline" onClick={() => inputNumber("1")}>1</Button>
            <Button variant="outline" onClick={() => inputNumber("2")}>2</Button>
            <Button variant="outline" onClick={() => inputNumber("3")}>3</Button>

            <Button variant="outline" onClick={() => inputNumber("0")} className="col-span-2">0</Button>
            <Button variant="outline" onClick={() => inputNumber(".")}>.</Button>
            <Button onClick={handleEquals} className="bg-gradient-to-r from-primary to-accent">=</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}