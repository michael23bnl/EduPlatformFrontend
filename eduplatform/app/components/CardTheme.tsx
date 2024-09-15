
interface Props {
    theme: string;
    content: string;
}

export const CardTheme = ({theme, content}: Props) => {
    return (
        <div style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
        }}>
            <p className="card__theme">{theme}</p>
            <p className="card__content">{content}</p>
        </div>
    )
}