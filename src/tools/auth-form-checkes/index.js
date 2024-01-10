export const isEmailInvalid = (email) => {
  if (!/\S+@\S+\.\S+/g.test(email)) {
    return "이메일 주소를 확인해주세요.";
  }

  return false;
}

export const isPasswordInvalid = (password) => {
  if (password.length < 6) {
    return "비밀번호는 6자 이상이어야 합니다.";
  }

  return false;
}

export const isPasswordConfirmInvalid = (password, passwordConfirm) => {
  if (password !== passwordConfirm) {
    return "비밀번호가 일치하지 않습니다.";
  }

  return false;
}

export const isNameInvalid = (name) => {
  if (name.length < 2) {
    return "이름은 2자 이상이어야 합니다.";
  }

  return false;
}