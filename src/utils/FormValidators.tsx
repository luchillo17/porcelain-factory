export class Validators {
  public static required(value: any) {
    return value ? undefined : 'Requerido';
  }

  public static number(value: number) {
    return value && isNaN(Number(value)) ? 'Debe ser un numero' : undefined;
  }

  public static minValue(min: number) {
    return (value) => value && value < min ? `Valor debe ser mayor o igual a ${min}.` : undefined;
  }

  public static minValueExclusive(min: number) {
    return (value) => value && value <= min ? `Valor debe ser mayor a ${min}.` : undefined;
  }

  public static maxValue(max: number) {
    return (value) => value && value > max ? `Valor debe ser menor o igual a ${max}.` : undefined;
  }

  public static maxValueExclusive(max: number) {
    return (value) => value && value >= max ? `Valor debe ser menor a ${max}.` : undefined;
  }

  public static minLength(min: number) {
    return (value) => value && value.length < min ? `Minimo ${min} caracteres.` : undefined;
  }

  public static minLength3(value: string) {
    return Validators.minLength(3)(value);
  }

  public static maxLength(max: number) {
    return (value) => value && value.length > max ? `Maximo ${max} caracteres.` : undefined;
  }

  public static maxLength3(value: string) {
    return Validators.maxLength(3)(value);
  }
}