import { createContext, useContext, useRef, type ReactNode, type MutableRefObject } from 'react';

import type { ParticleMesh } from '@/utils/ParticleMesh';

type MeshRefValue = MutableRefObject<ParticleMesh | null>;

const MeshContext = createContext<MeshRefValue | null>(null);

export function MeshProvider({ children }: { children: ReactNode }) {
  const meshRef = useRef<ParticleMesh | null>(null);
  return <MeshContext.Provider value={meshRef}>{children}</MeshContext.Provider>;
}

export function useMeshRef(): MeshRefValue {
  const ctx = useContext(MeshContext);
  if (!ctx) throw new Error('useMeshRef must be used within MeshProvider');
  return ctx;
}
