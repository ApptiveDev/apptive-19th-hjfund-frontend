import Modal from "@/components/modal";
import { ModalContent } from "@/components/modal";
import { ModalTitle } from "@/components/modal";

import styles from "./styles.module.scss";
import { ModalFooter } from "@/components/modal";
import Button from "@/components/button";
import { useState } from "react";
import Textfield from "@/components/textfield";

export function useChangeNameModal() {
  const [isOpen, setIsOpen] = useState(false);

  const component = (
    <Modal
      className={styles.namechange}
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
    >
      <form>
        <ModalTitle title="이름 변경" />
        <ModalContent className={styles.body}>
          <Textfield placeholder="변경할 이름" />
          <p className={styles.desc}>한글, 숫자, 영문만 이용 가능합니다.</p>
        </ModalContent>
        <ModalFooter>
          <Button
            buttonSize="small"
            buttonStyle="outlined"
            onClick={() => setIsOpen(false)}
          >
            취소
          </Button>
          <div style={{ flex: 1 }} />
          <Button buttonSize="small">적용</Button>
        </ModalFooter>
      </form>
    </Modal>
  );

  const open = () => setIsOpen(true);
  return [component, open];
}

export function useChangeEmailModal() {
  const [isOpen, setIsOpen] = useState(false);

  const component = (
    <Modal
      className={styles.namechange}
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
    >
      <form>
        <ModalTitle title="이메일 변경" />
        <ModalContent className={styles.body}>
          <Textfield type="email" placeholder="변경할 이메일" />
          <p className={styles.desc}>
            이메일 주소 변경 후 인증 메일을 승인하여야 합니다.
          </p>
        </ModalContent>
        <ModalFooter>
          <Button
            buttonSize="small"
            buttonStyle="outlined"
            onClick={() => setIsOpen(false)}
          >
            취소
          </Button>
          <div style={{ flex: 1 }} />
          <Button buttonSize="small">적용</Button>
        </ModalFooter>
      </form>
    </Modal>
  );

  const open = () => setIsOpen(true);
  return [component, open];
}
