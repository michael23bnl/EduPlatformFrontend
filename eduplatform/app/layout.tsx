import Layout, { Content, Footer, Header } from "antd/es/layout/layout";
import "./globals.css";
import { Menu } from "antd";
import Link from "next/link";


const items = [
  {key: "home", label: <Link href={"/"}>Главная</Link>},
  {key: "tasks", label: <Link href={"/tasks"}>Задачи</Link>},
  {key: "adminTasks", label: <Link href={"/Admin/tasks"}>Редактирование задач</Link>},
  {key: "register", label: <Link href={"/register"}>Регистрация</Link>},
  {key: "login", label: <Link href={"/login"}>Войти</Link>},
  //{key: "recommendedTasks", label: <Link href={"/recommendedTasks"}>Рекомендации</Link>},

]

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Layout style={{ minHeight: "100vh" }}>  
            <Header>
              <Menu theme="dark" mode="horizontal" items = {items} style={{flex: 1, minWidth: 0}}
              />
            </Header>
            <Content style={{padding: "0 48px" }}>{children}</Content>
            <Footer style={{textAlign: "center"}}>
              EduPlatform © 2024
            </Footer>
          </Layout>
        </body>
    </html>
  );
}
