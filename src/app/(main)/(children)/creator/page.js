import React from "react";
import styles from "./styles.module.scss";
import Header from "@/components/header";
import Image from "next/image";
import profilePicture from "../../../../../public/images/my/profile_temp.png";
import AddSquare from "../../../../../public/images/icon/add_square.svg";
import PencilIcon from "../../../../../public/images/icon/pencil.svg";
import CardList from "./(components)/card-list";

const Item = ({ text }) => {
  return (
    <p>
      {text.split("\n").map((txt) => (
        <>
          {txt}
          <br />
        </>
      ))}
    </p>
  );
};

export default function page() {
  return (
    <main>
      <Header />
      <article className={styles.article}>
        <header className={styles.header}>
          <section className={styles.editorProfile}>
            <Image
              src={profilePicture}
              alt="profile_pic"
              className={styles.profilePic}
            />
            <span className={styles.editor}>
              <p className={styles.text}>에디터</p>
              <p className={styles.name}>John Doe</p>
            </span>
          </section>
          <section>
            <div className={styles.rowSetting}>
              <span className={styles.introduce}>
                <Item
                  text={
                    "안녕하세요 주린이를 위한 성공투자가이드, 스톡트리입니다.\nHello, I'm Stocktree, a successful investment guide for stock beginners."
                  }
                />
                <span className={styles.buttons}>
                  <button className={styles.subButton}>
                    <AddSquare className={styles.subIcon} />
                    구독
                  </button>
                  <button className={styles.writeButton}>
                    <PencilIcon className={styles.writeIcon} />
                    글쓰기
                  </button>
                </span>
              </span>
            </div>
          </section>
        </header>
        <section className={styles.section}>
          <CardList />
        </section>
      </article>
    </main>
  );
}
