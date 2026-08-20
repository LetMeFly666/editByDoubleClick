/*
 * @Author: LetMeFly + Codex
 * @Date: 2026-08-19 12:14:35
 * @LastEditors: LetMeFly.xyz
 * @LastEditTime: 2026-08-20 10:57:47
 */
class FileNameEditor {
    constructor(el, options = {}) {
        this.el = el;
        this.options = {
            filename: "",
            size: "",
            onChange: null,
            ...options
        };
        this.selection = null;
        this.render();
        this.bind();
    }

    render() {
        this.el.innerHTML = `
            <div class="fne-box">
                <div class="fne-name">${this.options.filename}</div>
                <div class="fne-info">
                    <span class="fne-size">${this.options.size}</span>
                    <span class="fne-edit">✏️</span>
                </div>
            </div>
        `;

        this.name = this.el.querySelector(".fne-name");
        this.edit = this.el.querySelector(".fne-edit");
    }

    bind() {
        this.name.addEventListener("dblclick", e => this.editStart(true, e));
        this.edit.addEventListener("click", () => this.editStart(false));

        this.name.addEventListener("mouseup", () => {
            if (this.editing) this.saveSelection();
        });

        document.addEventListener("mousedown", e => {
            if (!this.el.contains(e.target)) this.editEnd();
        });

        this.name.addEventListener("keydown", e => {
            if (e.key === "Enter") {
                e.preventDefault();
                this.editEnd();
            }
            if (e.key === "Escape") this.editCancel();
        });
    }

    get editing() {
        return this.name.isContentEditable;
    }

    editStart(mouse, e) {
        if (this.editing) return;

        this.name.contentEditable = true;
        this.name.classList.add("editing");
        this.name.focus();

        if (mouse) {
            this.setCaretByPoint(e.clientX, e.clientY);
        } else if (!this.restoreSelection()) {
            this.setCaretEnd();
        }
    }

    editEnd() {
        if (!this.editing) return;

        this.saveSelection();
        this.name.contentEditable = false;
        this.name.classList.remove("editing");

        this.options.filename = this.name.textContent.trim();
        this.options.onChange?.(this.options.filename);
    }

    editCancel() {
        this.name.textContent = this.options.filename;
        this.name.contentEditable = false;
        this.name.classList.remove("editing");
    }

    saveSelection() {
        const sel = window.getSelection();
        if (sel?.rangeCount)
            this.selection = sel.getRangeAt(0).cloneRange();
    }

    restoreSelection() {
        if (!this.selection) return false;

        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(this.selection);
        return true;
    }

    setCaretEnd() {
        const range = document.createRange();
        range.selectNodeContents(this.name);
        range.collapse(false);

        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    }

    setCaretByPoint(x, y) {
        let range;

        if (document.caretRangeFromPoint) {
            range = document.caretRangeFromPoint(x, y);
        } else {
            const pos = document.caretPositionFromPoint(x, y);
            if (!pos) return;

            range = document.createRange();
            range.setStart(pos.offsetNode, pos.offset);
            range.collapse(true);
        }

        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    }
}
