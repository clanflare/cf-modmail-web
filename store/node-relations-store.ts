import { create } from "zustand";

interface NodeRelationsStore {
	nodeRelations: Map<string, Array<string>>;
	addNodeRelation: (key: string, data: Array<string>) => void;
	removeNodeRelation: (key: string) => Array<string>;
	addNodeChild: (key: string, child: string) => void;
	removeNodeChild: (key: string, child: string) => Array<string>;
	setNodeRelations: (newMap: Map<string, Array<string>>) => void;
}

export const useNodeRelationsStore = create<NodeRelationsStore>()((set) => ({
	nodeRelations: new Map<string, Array<string>>(),
	addNodeRelation: (key, data) =>
		set((prev) => {
			const nodeRelations: Map<string, Array<string>> = new Map({
				...prev.nodeRelations,
			});

			nodeRelations.set(key, data);

			return {
				nodeRelations,
			};
		}),
	removeNodeRelation: (key) => {
		const deleteNodeList: Array<string> = [];

		set((prev) => {
			const nodeRelations: Map<string, Array<string>> = new Map({
				...prev.nodeRelations,
			});

			const deletionQueue: Array<string> = [];
			deletionQueue.push(key);

			while (deletionQueue.length > 0) {
				const node = deleteNodeList.pop();

				if (node) {
					const children = nodeRelations.get(node);
					deleteNodeList.push(node);

					if (children) {
						deletionQueue.push(...children);
					}

					nodeRelations.delete(node);
				}
			}

			return {
				nodeRelations,
			};
		});

		return deleteNodeList;
	},
	addNodeChild: (key, child) =>
		set((prev) => {
			const nodeRelations: Map<string, Array<string>> = new Map({
				...prev.nodeRelations,
			});

			const prevChildren = nodeRelations.get(key);

			if (prevChildren) {
				nodeRelations.set(key, [...prevChildren, child]);
				nodeRelations.set(child, []);
			}

			return {
				nodeRelations,
			};
		}),
	removeNodeChild: (key, child) => {
		const deleteNodeList: Array<string> = [];

		set((prev) => {
			const nodeRelations: Map<string, Array<string>> = new Map({
				...prev.nodeRelations,
			});

			const deletionQueue: Array<string> = [];
			const prevChildren = nodeRelations.get(key);

			if (prevChildren) {
				nodeRelations.set(
					key,
					prevChildren.filter((oldChild) => oldChild !== child),
				);
				deleteNodeList.push(child);

				const nestedChildren = nodeRelations.get(child);

				if (nestedChildren) {
					deletionQueue.push(...nestedChildren);
				}
			}

			while (deletionQueue.length > 0) {
				const node = deletionQueue.pop();

				if (node) {
					const nodeChildren = nodeRelations.get(node);
					deleteNodeList.push(node);

					if (nodeChildren) {
						deletionQueue.push(...nodeChildren);
					}

					nodeRelations.delete(node);
				}
			}

			return {
				nodeRelations,
			};
		});

		return deleteNodeList;
	},
	setNodeRelations: (newMap) =>
		set(() => ({
			nodeRelations: newMap,
		})),
}));
