"use client";

import Textfield from "@/components/textfield";
import styles from "./styles.module.scss";
import { useCallback, useState } from "react";
import Boolean from "@/components/boolean";
import Button from "@/components/button";
import { isEmailInvalid, isPasswordInvalid } from "@/tools/auth-form-checkes";
import { LoginErrors, postLogin } from "@/requests/user/auth/login";
import { useRouter } from "next/navigation";

const formItems = [
  {
    type: "text",
    name: "email",
    placeholder: "이메일 주소",
  },
  {
    type: "password",
    name: "password",
    placeholder: "비밀번호",
  },
];

const formStateItem = {
  value: "",
  error: true,
};

const Form = ({ redirect }) => {
  const router = useRouter();

  const [formState, setFormState] = useState({
    email: formStateItem,
    password: formStateItem,
    keep: false,
  });

  const [formError, setFormError] = useState({
    message: "",
    visible: false,
  });

  const [isLoading, setIsLoading] = useState(false);

  const sendRequest = useCallback(
    (e) => {
      if (isLoading) return;
      const { email, password, keep } = formState;

      e.preventDefault();
      setIsLoading(true);

      postLogin({
        email: email.value,
        password: password.value,
        keep,
      })
        .then(() => {
          router.replace(redirect ?? "/");
        })
        .catch((errorCode) => {
          let errorMessage;

          switch (errorCode) {
            case LoginErrors.INVALID_ARGUMENTS:
              errorMessage = "이메일 또는 비밀번호를 잘못 입력하셨습니다.";
              break;
            case LoginErrors.INVALID_CREDENTIALS:
              errorMessage = "이메일 또는 비밀번호를 잘못 입력하셨습니다.";
              break;
            case LoginErrors.UNKNOWN:
              errorMessage = "알 수 없는 오류가 발생했습니다.";
              break;
          }

          setFormError({
            message: errorMessage,
            visible: true,
          });

          setIsLoading(false);
        });
    },
    [formState, redirect, isLoading]
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

    const { email, password } = formStateCopy;
    const items = ["email", "password"];

    [isEmailInvalid(email.value), isPasswordInvalid(password.value)].some(
      (message, i) => {
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
      }
    );
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
          );
        })}
      </div>
      <label className={styles.keep}>
        <Boolean
          name="keep"
          checked={formState.keep}
          onChange={(e) =>
            setFormState((prev) => ({
              ...prev,
              keep: e.target.checked,
            }))
          }
        />
        <span>로그인 유지하기</span>
      </label>
      <p className={styles.error}>
        {formError.visible ? formError.message : ""}
      </p>
      <Button
        buttonLoading={isLoading}
        className={styles.button}
        disabled={Object.values(formState).some((e) => e.error)}
        buttonStyle="filled"
      >
        로그인
      </Button>
    </form>
  );
};

export default Form;
