import { singleton } from "aurelia-framework";

export interface IVmUtil {
    getVm<T>(elem: Element | null | undefined): T | null;
}

@singleton()
export class VmUtil implements IVmUtil {
    getVm<T>(elem: Element | null | undefined): T | null {
        if (!elem) {
            return null;
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        return ((elem as any)["au"]?.["controller"]?.["viewModel"] ??
            null) as T | null;
    }
}
