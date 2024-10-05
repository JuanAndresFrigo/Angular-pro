import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  Inject,
  viewChild,
  viewChildren,
} from '@angular/core';
import { CalculatorButtonComponent } from '../calculator-button/calculator-button.component';
import { CalculatorService } from '@/calculator/services/calculator.service';

@Component({
  selector: 'calculator',
  standalone: true,
  imports: [CalculatorButtonComponent],
  templateUrl: './calculator.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:keyup)': 'handleKeyboardEvant($event)',
  },
})
export class CalculatorComponent {
  public calculatorsButtons = viewChildren(CalculatorButtonComponent);

  public resultText = computed(() => this.calculatorService.resultText());
  public subResultText = computed(() => this.calculatorService.subResultText());
  public lastOperator = computed(() => this.calculatorService.lastOperator());

  private calculatorService = inject(CalculatorService);

  public handleClick(key: string) {
    this.calculatorService.constructNumber(key);
  }

  // @HostListener('document:keyup', ['$event'])
  public handleKeyboardEvant(event: KeyboardEvent) {
    const keyEquivalents: Record<string, string> = {
      Escape: 'C',
      Clear: 'C',
      'x': '*',
       '÷' : '/',
      Enter: '=',
    };
    const key = event.key;
    const keyValue = keyEquivalents[key] ?? key;

    this.handleClick(keyValue);

    this.calculatorsButtons().forEach((button: CalculatorButtonComponent) => {
      button.keyboardPressedStyle(keyValue);
    });
  }
}
