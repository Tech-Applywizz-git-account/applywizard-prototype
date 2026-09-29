const positions = new Map<string, number>();

export const scrollMemory = {
  get(id: string) {
    return positions.get(id) ?? 0;
  },
  set(id: string, top: number) {
    positions.set(id, top);
  },
  clear(id: string) {
    positions.delete(id);
  },
  clearAll() {
    positions.clear();
  },
};
