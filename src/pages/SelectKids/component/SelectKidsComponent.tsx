import style from "../SelectKidsComponent.module.css"
import kidImg1 from "@/assets/imgs/kid1.svg"
import kidImg2 from "@/assets/imgs/kid2.svg"
import kidImg3 from "@/assets/imgs/kid3.svg"
import kidImg4 from "@/assets/imgs/kid4.svg"
const accounts = [
    { id: 1, name: '아이1', image: kidImg1},
    { id: 2, name: '아이2', image: kidImg2 },
    { id: 3, name: '아이3', image: kidImg3 },
    { id: 4, name: '아이4', image: kidImg4 },
];
const SelectKidComponent = () => {
    return (
        <div className={style.container}>
            <h1>그림을 그릴 아이를 선택해주세요</h1>
            <div className={style.accountlist}>
                {accounts.map(account => (
                    <div key={account.id} className={style.accountItem}>
                        <img src={account.image} alt={account.name} style={{ width: '100px', height: '150px' }} />
                        <p>{account.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default SelectKidComponent;