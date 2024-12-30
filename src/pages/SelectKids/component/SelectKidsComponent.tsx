import style from "../SelectKidsComponent.module.css"
import { kidsData } from "../kidsData"

const accounts = kidsData;

const SelectKidComponent = () => {
    const handleSelectKid = (id: number, name: string) => {
        sessionStorage.setItem('selectedKid', JSON.stringify({ id, name }));
    };

    return (
        <div className={style.container}>
            <h1 className={style.title}>✨그림을 그릴 아이를 선택해주세요✨</h1>
            <div className={style.accountlist}>
                {accounts.map(account => (
                    <div
                        key={account.id} 
                        className={style.accountItem}
                        onClick={() => handleSelectKid(account.id, account.name)}
                    >
                        <img 
                            src={account.image} 
                            alt={account.name} 
                            style={{ width: '100px', height: '150px', cursor: 'pointer' }} 
                        />
                        <p>{account.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default SelectKidComponent;