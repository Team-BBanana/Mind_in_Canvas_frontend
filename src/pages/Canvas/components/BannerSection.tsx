import Button from "@/components/recycleComponent/Button/Button.tsx";
import Toolbar from "@/pages/Canvas/components/Toolbar.tsx";

const BannerSection = () => {

            {/* 가운데 툴바 */}
    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between", // 좌우 끝에 요소 배치
                width: "100%", // 전체 화면 크기 기준으로 정렬
            }}
        >
            {/* 맨 왼쪽 버튼 */}
            <Button type="submit" style={{ marginLeft: "10px" }}>
                뒤로
            </Button>

            <div style={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
                <Toolbar />
            </div>

            {/* 맨 오른쪽 버튼 */}
            <Button type="submit" style={{ marginRight: "10px" }}>
                저장
            </Button>
        </div>
    );


}

export default BannerSection