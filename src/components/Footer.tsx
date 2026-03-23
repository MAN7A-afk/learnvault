import { Text } from "@stellar/design-system"
import { useTranslation } from "react-i18next"

export default function Footer() {
	const { t } = useTranslation()

	return (
		<footer
			style={{
				borderTop: "1px solid var(--sds-clr-gray-06)",
				padding: "1rem 3rem",
				textAlign: "center",
			}}
		>
			<div style={{ display: "flex", justifyContent: "center", gap: "2rem" }}>
				<a
					href="https://github.com/bakeronchain/learnvault"
					target="_blank"
					rel="noopener noreferrer"
				>
					<Text as="span" size="sm">
						{t("nav.github")}
					</Text>
				</a>
				<a href="#" target="_blank" rel="noopener noreferrer">
					<Text as="span" size="sm">
						{t("nav.discord")}
					</Text>
				</a>
				<a href="#" target="_blank" rel="noopener noreferrer">
					<Text as="span" size="sm">
						{t("nav.twitter")}
					</Text>
				</a>
				<a href="#" target="_blank" rel="noopener noreferrer">
					<Text as="span" size="sm">
						{t("nav.docs")}
					</Text>
				</a>
			</div>
		</footer>
	)
}
