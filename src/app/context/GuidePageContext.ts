import { createContext, useContext } from "react";

export class GuidePageContext {
    // _value:
    //  -2 : Full page
    //  -1 : Start page
    //   x : Show step (x + 1)

    public constructor(
        private _value: number,
        private readonly _stateUpdater: (x: number) => void
    ) { }

    private _updateValue(value: number) {
        this._value = value;
        this._stateUpdater(value);
    }

    public home() {
        this._updateValue(-1);
    }

    public showFullPage() {
        this._updateValue(-2);
    }

    public start() {
        this._updateValue(0);
    }

    public seek(value: number) {
        this._value = value;
    }

    public next() {
        this._updateValue(this._value + 1);
    }

    public previous() {
        this._updateValue(this._value - 1);
    }

    public get isHome() {
        return this._value == -1;
    }

    public get showingFullPage() {
        return this._value == -2;
    }

    public get page() {
        return this._value;
    }
}

const guidePageContext = createContext(new GuidePageContext(-1, () => {}));

export const useGuidePage = () => useContext(guidePageContext);
export const GuidePageProvider = guidePageContext.Provider