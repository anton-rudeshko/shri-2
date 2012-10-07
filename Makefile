OUT=out
RJS=node_modules/requirejs/bin/r.js
NODE=node

BUILD_JS=build/scripts.js
BUILD_CSS=build/styles.js
HTML=src/index.html

all: copy-html minify-js minify-css
	@echo Done

copy-html: start
	@echo Copying html
	@cp $(HTML) $(OUT)/

minify-js: start
	@echo Minifying JS
	@$(NODE) $(RJS) -o $(BUILD_JS)

minify-css: start
	@echo Minifying CSS
	@$(NODE) $(RJS) -o $(BUILD_CSS)

start: clean
	@echo Make output dir
	@mkdir $(OUT)

clean:
	@echo Cleaning
	@rm -rf $(OUT)

install:
	npm install