import { Directive, EventEmitter, HostListener, Output } from "@angular/core";

@Directive({
    selector: "[longPress]",
})
export class LongPressDirective {
    @Output() longPress = new EventEmitter<MouseEvent | TouchEvent>();

    private timeoutId: any;

    @HostListener("mousedown", ["$event"])
    @HostListener("touchstart", ["$event"])
    onPressStart(event: MouseEvent | TouchEvent) {
        this.timeoutId = setTimeout(() => {
            this.longPress.emit(event);
        }, 500); // 500ms = long press threshold
    }

    @HostListener("mouseup")
    @HostListener("mouseleave")
    @HostListener("touchend")
    onPressEnd() {
        clearTimeout(this.timeoutId);
    }
}
