"use client";

import Textfield from "@/components/textfield";
import styles from "./styles.module.scss";
import { useCallback, useState } from "react";
import Button from "@/components/button";
import {
  isPasswordConfirmInvalid,
  isPasswordInvalid,
} from "@/tools/auth-form-checkes";

const formItems = [
  {
    type: "password",
    name: "old",
    placeholder: "현재 비밀번호",
  },
  {
    type: "password",
    name: "password",
    placeholder: "비밀번호",
  },
  {
    type: "password",
    name: "passwordConfirm",
    placeholder: "비밀번호 확인",
  },
];

const formStateItem = {
  value: "",
  error: true,
};

const Form = () => {
  const [formState, setFormState] = useState({
    old: formStateItem,
    password: formStateItem,
    passwordConfirm: formStateItem,
  });

  const [formError, setFormError] = useState({
    message: "",
    visible: false,
  });

  const [isLoading, setIsLoading] = useState(false);

  const sendRequest = useCallback(
    async (e) => {
      e.preventDefault();
      setIsLoading(true);
    },
    [formState]
  );

  const handleOnChange = (name, e) => {
    setFormState((prev) => ({
      ...prev,
      [name]: {
        ...prev[name],
        value: e.target.value,
      },
    }));

    let formStateCopy = JSON.parse(JSON.stringify(formState));
    formStateCopy[name].value = e.target.value;

    const { old, password, passwordConfirm } = formStateCopy;
    const items = ["old", "password", "passwordConfirm"];

    [
      false,
      isPasswordInvalid(password.value),
      isPasswordConfirmInvalid(password.value, passwordConfirm.value),
    ].some((message, i) => {
      const notEmpty = formState[items[i]].value.length > 0;

      setFormState((prev) => ({
        ...prev,
        [items[i]]: {
          ...prev[items[i]],
          error: !!message,
        },
      }));

      setFormError({
        message: (notEmpty && message) || "",
        visible: false,
      });

      if (message) return true;
    });
  };

  const handleOnBlur = () => {
    setFormError((prev) => ({
      ...prev,
      visible: true,
    }));
  };

  return (
    <form className={styles.form} onSubmit={sendRequest}>
      <div className={styles.texts}>
        {formItems.map((item) => {
          const borderColor =
            formState[item.name].value.length > 0 &&
            formError.visible &&
            formState[item.name].error
              ? "red"
              : undefined;

          return (
            <div className={styles.textfield}>
              <label>{item.placeholder}</label>
              <Textfield
                key={item.name}
                type={item.type}
                name={item.name}
                placeholder={item.placeholder}
                value={formState[item.name].value}
                onChange={(e) => handleOnChange(item.name, e)}
                onBlur={handleOnBlur}
                textfieldBorderColor={borderColor}
                textfieldHoverBorderColor={borderColor}
                textfieldFocusBorderColor={borderColor}
              />
            </div>
          );
        })}
      </div>
      <p className={styles.error}>
        {formError.visible ? formError.message : ""}
      </p>
      <Button
        className={styles.button}
        disabled={Object.values(formState).some((e) => e.error)}
        buttonStyle="filled"
      >
        변경하기
      </Button>
    </form>
  );
};

export default Form;
