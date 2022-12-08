import { FormControl, FormGroup } from '@angular/forms';

export type Form<T> = {
  [K in keyof T]: T[K] extends 'object'
    ? FormGroup<Form<T[K]>>
    : FormControl<T[K]>;
};

export type ControlsOf<T extends Record<string, any>> = {
  [K in keyof T]: T[K] extends Record<any, any>
    ? FormGroup<ControlsOf<T[K]>>
    : FormControl<T[K]>;
};
