"use client";

import Textfield from "@/components/textfield";
import styles from "./styles.module.scss";
import { useCallback, useState } from "react";
import Boolean from "@/components/boolean";
import Button from "@/components/button";
import {
  isEmailInvalid,
  isNameInvalid,
  isPasswordConfirmInvalid,
  isPasswordInvalid,
} from "@/tools/auth-form-checkes";
import Link from "next/link";
import { RegisterErrors, postRegister } from "@/requests/user/auth/register";
import { postLogin } from "@/requests/user/auth/login";
import { useRouter } from "next/navigation";

const formItems = [
  {
    type: "text",
    name: "email",
    placeholder: "이메일 주소",
  },
  {
    type: "text",
    name: "name",
    placeholder: "이름",
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
  const router = useRouter();

  const [formState, setFormState] = useState({
    email: formStateItem,
    name: formStateItem,
    password: formStateItem,
    passwordConfirm: formStateItem,
    keep: false,
  });

  const [formError, setFormError] = useState({
    message: "",
    visible: false,
  });

  const [isAgreed, setIsAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const sendRequest = useCallback(
    (e) => {
      if (isLoading) return;
      const { email, name, password } = formState;

      e.preventDefault();
      setIsLoading(true);

      postRegister({
        email: email.value,
        name: name.value,
        password: password.value,
      })
        .then(() => router.replace("/my/account?new=true"))
        .catch((errorCode) => {
          let errorMessage;

          switch (errorCode) {
            case RegisterErrors.INVALID_ARGUMENTS:
              errorMessage =
                "잘못된 값이 포함되어 있습니다. 각 항목을 다시 확인해 주십시오.";
              break;
            case RegisterErrors.EMAIL_ALREADY_EXISTS:
              errorMessage = "이미 가입된 이메일입니다.";
              setFormState((prev) => ({
                ...prev,
                email: {
                  ...prev.email,
                  error: true,
                },
              }));
              break;
            case RegisterErrors.UNKNOWN:
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
    [formState, isLoading]
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

    const { email, name: userName, password, passwordConfirm } = formStateCopy;
    const items = ["email", "name", "password", "passwordConfirm"];

    [
      isEmailInvalid(email.value),
      isNameInvalid(userName.value),
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
      <p className={styles.error}>
        {formError.visible ? formError.message : ""}
      </p>
      <label className={styles.terms}>
        <Boolean
          className={styles.checkbox}
          checked={isAgreed}
          onChange={(e) => setIsAgreed(e.target.checked)}
        />
        <div>
          <Link className="link" href="/terms">
            이용약관
          </Link>
          과&nbsp;
          <Link className="link" href="/privacy">
            개인정보 처리방침
          </Link>
          에 동의합니다.
        </div>
      </label>
      <Button
        buttonLoading={isLoading}
        className={styles.button}
        disabled={!isAgreed || Object.values(formState).some((e) => e.error)}
        buttonStyle="filled"
      >
        회원가입
      </Button>
    </form>
  );
};

export default Form;
