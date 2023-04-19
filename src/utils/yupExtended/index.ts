// yup-extended.ts
import * as yup from "yup";
import { DateSchema } from "yup";
import { AssertsShape, ObjectShape, TypeOfShape } from "yup/lib/object";
import { AnyObject, Maybe, Optionals } from "yup/lib/types";

// check string empty or undefined
yup.addMethod<yup.StringSchema>(yup.string, "emptyAsUndefined", function () {
  return this.transform((value) => (value ? value : undefined));
});

// check number empty or undefined
yup.addMethod<yup.NumberSchema>(yup.number, "emptyAsUndefined", function () {
  return this.transform((value, originalValue) =>
    String(originalValue)?.trim() ? value : undefined
  );
});

// check mix object empty or undefined
yup.addMethod(yup.mixed, "emptyAsUndefined", function () {
  return this.transform((value, originalValue) =>
    String(originalValue)?.trim() ? value : undefined
  );
});

// test form schema and create error if needed
yup.addMethod<yup.ObjectSchema<any>>(yup.object, "dropdown", function (args) {
  return this.test("key-value-test", "", function (value) {
    const { createError } = this;
    const { optional } = args || { optional: false };
    if ((!value?.key || !value?.value) && !optional) {
      return createError({ message: "This field is required." });
    }
    return true;
  });
});

// validate phone number
yup.addMethod<yup.ObjectSchema<any>>(
  yup.object,
  "phoneNumber",
  function (args) {
    return this.test("phone-number-test", "", function (value) {
      const { createError } = this;
      const { optional } = args || { optional: false };
      // eslint-disable-next-line no-useless-escape
      const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
      if (!value?.number && !optional) {
        return createError({ message: "This field is required." });
      }
      if (value?.number) {
        if (!value?.number?.match(regex)) {
          return createError({ message: "Enter a valid phone number." });
        }
      }

      return true;
    });
  }
);

// declare yup model
yup.addMethod<yup.ObjectSchema<any>>(yup.object, "timeInput", function (args) {
  return this.test("time-input-test", "", function (value) {
    const { createError } = this;
    const { optional } = args || { optional: false };
    if ((!value?.hour || !value?.minute || !value?.period) && !optional) {
      return createError({ message: "This field is required." });
    }
    return true;
  });
});

yup.addMethod<DateSchema>(yup.date, "minAge", function (args) {
  return this.test("min-age-test", "", function (value) {
    const { createError } = this;
    const { optional, min } = args || { optional: false };
    var dateOfBirth = new Date(value || "");
    var differenceMs = Date.now() - dateOfBirth.getTime();
    var dateFromEpoch = new Date(differenceMs);
    var yearFromEpoch = dateFromEpoch.getUTCFullYear();
    var age = Math.abs(yearFromEpoch - 1970);

    if (!value && !optional) {
      return createError({ message: "This field is required." });
    }
    if (age < min && !optional) {
      return createError({ message: `Age Should be over ${min}` });
    }

    return true;
  });
});

declare module "yup" {
  interface ObjectSchema<
    TShape extends ObjectShape,
    TContext extends AnyObject = AnyObject,
    TIn extends Maybe<TypeOfShape<TShape>> = TypeOfShape<TShape>,
    TOut extends Maybe<AssertsShape<TShape>> =
      | AssertsShape<TShape>
      | Optionals<TIn>
  > extends yup.BaseSchema<TIn, TContext, TOut> {
    dropdown(args?: { optional: boolean }): ObjectSchema<TShape, TContext, TIn>;
    phoneNumber(args?: {
      optional: boolean;
    }): ObjectSchema<TShape, TContext, TIn>;
    timeInput(args?: {
      optional: boolean;
    }): ObjectSchema<TShape, TContext, TIn>;
  }

  interface StringSchema<
    TType extends Maybe<string> = string | undefined,
    TContext extends AnyObject = AnyObject,
    TOut extends TType = TType
  > extends yup.BaseSchema<TType, TContext, TOut> {
    emptyAsUndefined(): StringSchema<TType, TContext>;
  }

  interface NumberSchema<
    TType extends Maybe<number> = number | undefined,
    TContext extends AnyObject = AnyObject,
    TOut extends TType = TType
  > extends yup.BaseSchema<TType, TContext, TOut> {
    emptyAsUndefined(): NumberSchema<TType, TContext>;
  }

  interface DateSchema {
    minAge(args?: { optional?: boolean; min: number }): DateSchema;
  }
}

export default yup;
