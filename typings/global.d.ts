declare namespace GoatCounter {
    interface CountVars {
        event?: boolean;
        path?: string;
        title?: string;
        referrer?: string;
    }

    interface GoatCounter {
        no_onload?: boolean;
        count?: (vars: CountVars) => void;
    }
}

declare global {
    interface Window {
        goatcounter?: GoatCounter.GoatCounter;
    }
}

export {}
