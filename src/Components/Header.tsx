export default function Header() {
    return (
      <>
        <header className="w-full h-[110px] bg-gradient-to-r from-[#5e5ced] to-[#572486] flex items-center justify-between px-10">
          <div className="flex items-center flex-shrink-0">
            <a href="#">
              <img src="../Logo.png" alt="Logo" className="" />
            </a>
              <h1 className="text-white px-4 pt-7">Residencial Jardins  •  Zeladora</h1>
          </div>

          <div className="gap-2 flex items-center justify-center">
            <img src="../Doorbell.png" alt="" />
            <div className="bg-[#EAEAEA] rounded-full h-12 w-[0.1px]"></div>
            <div className="bg-[#EAEAEA] rounded-full h-12 w-12"></div>{/*substituir por um img aonde puxara a foto de perfil da pessoa com a mesma classe*/}
              <div  className="text-white">
                <h1 className="text-[18px]">Ema</h1> {/*Colocar que puxe o nome do perfil da pessoa*/}
                <h1 className="text-[14px]">Zeladora</h1>{/*Chamar a função em que a pessoa trabalha, adminstradora, zeladora e etc.*/}
              </div>
          </div>
            <img className="flex items-end justify-end w-9 h-9" src="../Logout.png" alt="" />
        </header>
      </>
    );
  }