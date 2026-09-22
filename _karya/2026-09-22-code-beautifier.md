---
layout: karya
title: "Advanced Code Beautifier"
cat: "app"
year: 2026
desc: "Code Beautifier adalah alat untuk memperindah dan memperbaiki tampilan kode sumber. Mendukung berbagai bahasa pemrograman."
thumb: 1
extra_css:
  - "/assets/css/tools/styles.css"
  - "/assets/css/tools/codebeuty.css"
extra_js:
  - "/assets/js/tools/beautify.js"
  - "/assets/js/tools/beautify-css.js"
  - "/assets/js/tools/beautify-html.js"
  - "/assets/js/tools/prism.min.js"
  - "/assets/js/tools/prism-javascript.min.js"
  - "/assets/js/tools/prism-css.min.js"
  - "/assets/js/tools/prism-markup.min.js"
  - "/assets/js/tools/js-beauty.js"
---
<div class="code-tool">
    <div class="code-tool-card">

        <div class="code-tool-field">
            <label for="languageSelect" class="code-tool-label">
                Select Language
                <span class="code-tool-optional">(Optional)</span>
            </label>

            <select
                class="code-tool-select"
                id="languageSelect"
            >
                <option value="auto">Auto-detect</option>
                <option value="js">JavaScript</option>
                <option value="html">HTML</option>
                <option value="css">CSS</option>
            </select>
        </div>

        <div class="code-tool-field">
            <label for="indentSize" class="code-tool-label">
                Indent Size
            </label>

            <input
                type="number"
                class="code-tool-input"
                id="indentSize"
                value="2"
                min="1"
                max="8"
            >
        </div>

        <div class="code-tool-field">
            <label for="codeInput" class="code-tool-label">
                Input Code
            </label>

            <textarea
                class="code-tool-textarea"
                id="codeInput"
                rows="10"
                placeholder="Enter code here..."
            ></textarea>
        </div>

        <div class="code-tool-actions">
            <button
                type="button"
                class="code-tool-btn code-tool-btn-primary"
                onclick="beautifyCode()"
            >
                Beautify
            </button>

            <button
                type="button"
                class="code-tool-btn code-tool-btn-secondary"
                onclick="copyToClipboard('codeOutput')"
            >
                Copy
            </button>
        </div>

        <div class="code-tool-output">
            <label for="codeOutput" class="code-tool-label">
                Beautified Output
            </label>

            <div class="code-tool-output-box">
                <pre class="code-tool-pre"><code
                    id="codeOutput"
                    class="language-js"
                ></code></pre>
            </div>
        </div>

    </div>
</div>