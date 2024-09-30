import { Suspense } from "react";

export default function TemplateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Suspense>
        {children}
      </Suspense>
    </>
  )
}