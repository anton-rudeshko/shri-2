NODE=node
OUT=out

HANDLEBARS=node_modules/handlebars/bin/handlebars
TEMPLATES_IN=src/templates/
TEMPLATES_OUT=src/js/templates.js

RJS=node_modules/requirejs/bin/r.js

BUILD_JS=build/scripts.js
BUILD_CSS=build/styles.js
HTML=src/index.html

all: copy-html minify-js minify-css
	@echo Done

copy-html: start
	@echo Copying html
	@cp $(HTML) $(OUT)/

minify-js: start templates
	@echo Minifying JS
	@$(NODE) $(RJS) -o $(BUILD_JS)

minify-css: start
	@echo Minifying CSS
	@$(NODE) $(RJS) -o $(BUILD_CSS)

templates:
	@echo Compiling templates
	@$(NODE) $(HANDLEBARS) $(TEMPLATES_IN) -k each -k if -k unless -a > $(TEMPLATES_OUT)

start: clean
	@echo Make output dir
	@mkdir $(OUT)

clean:
	@echo Cleaning
	@rm -rf $(OUT)

install:
	npm install