import { PropElement } from "../elements/prop";

export interface IPropNavigator {
    goToParent(fromProp: PropElement): void;
    goToChild(fromProp: PropElement): void;
    goToPrevSibling(fromProp: PropElement): void;
    goToNextSibling(fromProp: PropElement): void;
    setCollapsed(prop: PropElement, value?: boolean): void;
}

export class PropNavigator implements IPropNavigator {

    goToParent(fromProp: PropElement): void {
        const parentPropList = fromProp.parentPropListElement;
        if (parentPropList) {
            parentPropList.parentPropElement.childPropHeadElement.focus();
        }
    }

    goToChild(fromProp: PropElement): void {
        const childPropList = fromProp.childPropListElement;
        const childPropListElems = childPropList ? childPropList.childPropElements.filter(cpe => cpe.collapsible) : null;
        if (childPropListElems && childPropListElems.length) {
            childPropListElems[0].childPropHeadElement.focus();
        }
    }

    goToPrevSibling(fromProp: PropElement): void {
        const parentPropList = fromProp.parentPropListElement;
        if (parentPropList) {
            const selectableProps = parentPropList.childPropElements.filter(cpe => cpe.collapsible);
            const currIndex = selectableProps.indexOf(fromProp);
            if (currIndex > 0) {
                selectableProps[currIndex - 1].childPropHeadElement.focus();
            }
        }
    }

    goToNextSibling(fromProp: PropElement): void {
        const parentPropList = fromProp.parentPropListElement;
        if (parentPropList) {
            const selectableProps = parentPropList.childPropElements.filter(cpe => cpe.collapsible);
            const currIndex = selectableProps.indexOf(fromProp);
            if (currIndex < selectableProps.length - 1) {
                selectableProps[currIndex + 1].childPropHeadElement.focus();
            }
        }
    }

    setCollapsed(prop: PropElement, value: boolean = true, recursive: boolean = false): void {
        if (prop.collapsible) {
            if (value && !prop.collapsed) {
                prop.collapsed = true;
            } else if (!value && prop.collapsed) {
                prop.collapsed = false;
                if (prop.accordionmode) {
                    const parentPropList = prop.parentPropListElement;
                    if (parentPropList) {
                        const collapsibleProps = parentPropList.childPropElements.filter(cpe => cpe.collapsible);
                        const currIndex = collapsibleProps.indexOf(prop);
                        if (currIndex >= 0) {
                            collapsibleProps.forEach((p, idx) => {
                                if (p !== prop) {
                                    p.collapsed = true;
                                }
                            });
                            //prop.childPropHeadElement.scrollIntoView();
                        }
                    }
                } else if (recursive) {
                    this.expandChildrenRecursive(prop);
                }
            }
        }
    }

    private expandChildrenRecursive(prop: PropElement): void {
        if (!prop.accordionmode) {
            return;
        }
        const collapsibleChildProps = prop.childPropListElement ?
            prop.childPropListElement.childPropElements.filter(p => p.collapsible) :
            [];

        for (const childProp of collapsibleChildProps) {
            this.expandChildrenRecursive(childProp);
        }
    }
}