import Button from "@/components/recycleComponent/Button/Button.tsx";
import Toolbar from "@/pages/Canvas/components/Toolbar.tsx";
import style from "../CanvasPage.module.css"

const BannerSection = () => {

    return (
        <div className={style.banner}>
            {/* 맨 왼쪽 버튼 */}
            <Button type="submit" className={style.bannerbutton} style={{ marginLeft: "10px" }}>
                뒤로
            </Button>

            {/* 가운데 툴바 */}
            <div style={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
                <Toolbar />
            </div>

            {/* 맨 오른쪽 버튼 */}
            <Button type="submit" className={style.bannerbutton} style={{ marginRight: "10px" }}>
                저장
            </Button>
        </div>
    );


}

export default BannerSection