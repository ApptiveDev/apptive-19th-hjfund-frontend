"use client";

import Icon from "@/components/icon";
import styles from "./styles.module.scss";
import Button from "@/components/button";
import { classes } from "@/tools/classes";
import { conditionalClass } from "@/tools/classes";
import { useChangeEmailModal, useChangeNameModal } from "../modals";
import Avatar from "@/components/avatar";
import { useAuth } from "@/tools/auth-provider";

function ProfileImage({ url }) {
  return (
    <div className={styles.profile}>
      <span className={styles.edit}>
        <Icon iconType="pencil" />
      </span>
      <Avatar className={styles.avatar} url={url} />
    </div>
  );
}

function ProfileItem({ label, value, onClick }) {
  return (
    <div className={styles.item}>
      <div className={styles.texts}>
        <p className={styles.label}>{label}</p>
        <p className={styles.value}>{value}</p>
      </div>
      <Button buttonSize="small" buttonStyle="outlined" onClick={onClick}>
        수정
      </Button>
    </div>
  );
}

export default function Profile({ isMobile }) {
  const { user } = useAuth();

  const [changeNameModal, openChangeNameModal] = useChangeNameModal();
  const [changeEmailModal, openChangeEmailModal] = useChangeEmailModal();

  return (
    <div
      className={classes(
        styles.container,
        conditionalClass(isMobile, styles.mobile)
      )}
    >
      {changeNameModal}
      {changeEmailModal}
      <ProfileImage />
      <div className={styles.list}>
        <ProfileItem label="이름" value={user && user.nickName} onClick={() => openChangeNameModal()} />
        <ProfileItem label="이메일" value={user && user.uid} onClick={() => openChangeEmailModal()} />
      </div>
    </div>
  );
}
