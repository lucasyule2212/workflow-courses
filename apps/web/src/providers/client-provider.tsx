"use client";
import buildProvidersTree from "@/providers/buildProvidersTree";
import { getCurrentEnvironment } from "@/relay/environment";
import { Suspense } from "react";
import { RelayEnvironmentProvider } from "react-relay";

export const relayEnvironment = getCurrentEnvironment();
const ProvidersTree = buildProvidersTree([
  [RelayEnvironmentProvider, { environment: relayEnvironment }],
]);

export default function ClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProvidersTree>{children}</ProvidersTree>;
}
