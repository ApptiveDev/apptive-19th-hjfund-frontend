"use client";

import Textfield from "@/components/textfield";
import styles from "./styles.module.scss";
import { useCallback, useState } from "react";
import Checkbox from "@/components/checkbox";
import Button from "@/components/button";
import {
  isEmailInvalid,
  isNameInvalid,
  isPasswordConfirmInvalid,
  isPasswordInvalid,
} from "@/tools/auth-form-checkes";
import Link from "next/link";
import { POST } from "@/requests/user/auth/register";

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

  const [isLoading, setIsLoading] = useState(false);

  const sendRequest = useCallback(async (e, { email, name, password }) => {
    e.preventDefault();
    setIsLoading(true);
    const res = await POST({ email, name, password });
    console.log(res);
  }, []);

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
    <form
      className={styles.form}
      onSubmit={(e) =>
        sendRequest(e, {
          email: formState.email.value,
          name: formState.name.value,
          password: formState.password.value,
        })
      }
    >
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
        <Checkbox className={styles.checkbox} />
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
        className={styles.button}
        disabled={Object.values(formState).some((e) => e.error)}
        buttonStyle="filled"
      >
        회원가입
      </Button>
    </form>
  );
};

export default Form;
