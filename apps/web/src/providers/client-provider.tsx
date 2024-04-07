"use client";
import buildProvidersTree from "@/providers/buildProvidersTree";

const ProvidersTree = buildProvidersTree([]);

export default function ClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProvidersTree>{children}</ProvidersTree>;
}
