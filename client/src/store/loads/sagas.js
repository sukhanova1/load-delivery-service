export function* loadWatcher() {}

export default function* rootLoadSaga() {
	yield loadWatcher();
}
