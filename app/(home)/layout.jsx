import Header from "@/components/shared/Header";

export default function Layout({ children }) {
    return (
        <>
            <Header />
            {children}
        </>
    );
}
