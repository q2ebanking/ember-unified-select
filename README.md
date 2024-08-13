# THIS PROJECT IS ARCHIVED AND NO LONGER MAINTAINED

# ember-unified-select

This README outlines the details of collaborating on this Ember addon.

## Installation

* `git clone <repository-url>` this repository
* `cd ember-unified-select`
* `npm install`

## Running Independently

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

## Install

In Ember project
* `ember install @q2ebanking/ember-unified-select`
* call component in desired place with `{{unified-select}}`
* Build app

## Running Tests

* `npm test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).

## Example usage
```
{{unified-select
    selectId="state-select"
    options=statesArray
    disabled=disabled
    placeholder=placeholder
    selected=selected
    onchange=(action (mut selected))
    valueKey=valueKey
    displayKey=displayKey
    nativeSelect=false
    label=labelText
}}
```

yields

```
<div id="ember177" class="unified-select ember-view">
    <div class="unified-select-wrapper">
        <input class="unified-select-dropdown" id="state-select" readonly="true" placeholder="" aria-haspopup="listbox" aria-controls="unified-select-dropdown-list-ember177" type="text">
        <div class="unified-select-dropdown-container searchable open" tabindex="-1">
            <ul id="unified-select-dropdown-list-ember177" class="unified-select-dropdown-list " role="listbox">
                <li data-test-id="sbDeepOption0">
                    <a class=" filtered" href="javascript://" role="option">
                        Alabama
                    </a>
                </li>
                <li data-test-id="sbDeepOption1">
                    <a class=" filtered" href="javascript://" role="option">
                        Alaska
                    </a>
                </li>
                <li data-test-id="sbDeepOption2">
                    <a class=" filtered" href="javascript://" role="option">
                        American Samoa
                    </a>
                </li>
                <li data-test-id="sbDeepOption3">
                    <a class=" filtered" href="javascript://" role="option">
                        Arizona
                    </a>
                </li>
                <li data-test-id="sbDeepOption4">
                    <a class=" filtered" href="javascript://" role="option">
                        Arkansas
                    </a>
                </li>
                <li data-test-id="sbDeepOption5">
                    <a class=" filtered" href="javascript://" role="option">
                        California
                    </a>
                </li>
                <li data-test-id="sbDeepOption6">
                    <a class=" filtered" href="javascript://" role="option">
                        Colorado
                    </a>
                </li>
                <li data-test-id="sbDeepOption7">
                    <a class=" filtered" href="javascript://" role="option">
                        Connecticut
                    </a>
                </li>
                <li data-test-id="sbDeepOption8">
                    <a class=" filtered" href="javascript://" role="option">
                        Delaware
                    </a>
                </li>
                <li data-test-id="sbDeepOption9">
                    <a class=" filtered" href="javascript://" role="option">
                        District Of Columbia
                    </a>
                </li>
                <li data-test-id="sbDeepOption10">
                    <a class=" filtered" href="javascript://" role="option">
                        Federated States Of Micronesia
                    </a>
                </li>
                <li data-test-id="sbDeepOption11">
                    <a class=" filtered" href="javascript://" role="option">
                        Florida
                    </a>
                </li>
                <li data-test-id="sbDeepOption12">
                    <a class=" filtered" href="javascript://" role="option">
                        Georgia
                    </a>
                </li>
                <li data-test-id="sbDeepOption13">
                    <a class=" filtered" href="javascript://" role="option">
                        Guam
                    </a>
                </li>
                <li data-test-id="sbDeepOption14">
                    <a class=" filtered" href="javascript://" role="option">
                        Hawaii
                    </a>
                </li>
                <li data-test-id="sbDeepOption15">
                    <a class=" filtered" href="javascript://" role="option">
                        Idaho
                    </a>
                </li>
                <li data-test-id="sbDeepOption16">
                    <a class=" filtered" href="javascript://" role="option">
                        Illinois
                    </a>
                </li>
                <li data-test-id="sbDeepOption17">
                    <a class=" filtered" href="javascript://" role="option">
                        Indiana
                    </a>
                </li>
                <li data-test-id="sbDeepOption18">
                    <a class=" filtered" href="javascript://" role="option">
                        Iowa
                    </a>
                </li>
                <li data-test-id="sbDeepOption19">
                    <a class=" filtered" href="javascript://" role="option">
                        Kansas
                    </a>
                </li>
                <li data-test-id="sbDeepOption20">
                    <a class=" filtered" href="javascript://" role="option">
                        Kentucky
                    </a>
                </li>
                <li data-test-id="sbDeepOption21">
                    <a class=" filtered" href="javascript://" role="option">
                        Louisiana
                    </a>
                </li>
                <li data-test-id="sbDeepOption22">
                    <a class=" filtered" href="javascript://" role="option">
                        Maine
                    </a>
                </li>
                <li data-test-id="sbDeepOption23">
                    <a class=" filtered" href="javascript://" role="option">
                        Marshall Islands
                    </a>
                </li>
                <li data-test-id="sbDeepOption24">
                    <a class=" filtered" href="javascript://" role="option">
                        Maryland
                    </a>
                </li>
                <li data-test-id="sbDeepOption25">
                    <a class=" filtered" href="javascript://" role="option">
                        Massachusetts
                    </a>
                </li>
                <li data-test-id="sbDeepOption26">
                    <a class=" filtered" href="javascript://" role="option">
                        Michigan
                    </a>
                </li>
                <li data-test-id="sbDeepOption27">
                    <a class=" filtered" href="javascript://" role="option">
                        Minnesota
                    </a>
                </li>
                <li data-test-id="sbDeepOption28">
                    <a class=" filtered" href="javascript://" role="option">
                        Mississippi
                    </a>
                </li>
                <li data-test-id="sbDeepOption29">
                    <a class="selected filtered" href="javascript://" role="option" aria-selected="">
                        Missouri
                    </a>
                </li>
                <li data-test-id="sbDeepOption30">
                    <a class=" filtered" href="javascript://" role="option">
                        Montana
                    </a>
                </li>
                <li data-test-id="sbDeepOption31">
                    <a class=" filtered" href="javascript://" role="option">
                        Nebraska
                    </a>
                </li>
                <li data-test-id="sbDeepOption32">
                    <a class=" filtered" href="javascript://" role="option">
                        Nevada
                    </a>
                </li>
                <li data-test-id="sbDeepOption33">
                    <a class=" filtered" href="javascript://" role="option">
                        New Hampshire
                    </a>
                </li>
                <li data-test-id="sbDeepOption34">
                    <a class=" filtered" href="javascript://" role="option">
                        New Jersey
                    </a>
                </li>
                <li data-test-id="sbDeepOption35">
                    <a class=" filtered" href="javascript://" role="option">
                        New Mexico
                    </a>
                </li>
                <li data-test-id="sbDeepOption36">
                    <a class=" filtered" href="javascript://" role="option">
                        New York
                    </a>
                </li>
                <li data-test-id="sbDeepOption37">
                    <a class=" filtered" href="javascript://" role="option">
                        North Carolina
                    </a>
                </li>
                <li data-test-id="sbDeepOption38">
                    <a class=" filtered" href="javascript://" role="option">
                        North Dakota
                    </a>
                </li>
                <li data-test-id="sbDeepOption39">
                    <a class=" filtered" href="javascript://" role="option">
                        Northern Mariana Islands
                    </a>
                </li>
                <li data-test-id="sbDeepOption40">
                    <a class=" filtered" href="javascript://" role="option">
                        Ohio
                    </a>
                </li>
                <li data-test-id="sbDeepOption41">
                    <a class=" filtered" href="javascript://" role="option">
                        Oklahoma
                    </a>
                </li>
                <li data-test-id="sbDeepOption42">
                    <a class=" filtered" href="javascript://" role="option">
                        Oregon
                    </a>
                </li>
                <li data-test-id="sbDeepOption43">
                    <a class=" filtered" href="javascript://" role="option">
                        Palau
                    </a>
                </li>
                <li data-test-id="sbDeepOption44">
                    <a class=" filtered" href="javascript://" role="option">
                        Pennsylvania
                    </a>
                </li>
                <li data-test-id="sbDeepOption45">
                    <a class=" filtered" href="javascript://" role="option">
                        Puerto Rico
                    </a>
                </li>
                <li data-test-id="sbDeepOption46">
                    <a class=" filtered" href="javascript://" role="option">
                        Rhode Island
                    </a>
                </li>
                <li data-test-id="sbDeepOption47">
                    <a class=" filtered" href="javascript://" role="option">
                        South Carolina
                    </a>
                </li>
                <li data-test-id="sbDeepOption48">
                    <a class=" filtered" href="javascript://" role="option">
                        South Dakota
                    </a>
                </li>
                <li data-test-id="sbDeepOption49">
                    <a class=" filtered" href="javascript://" role="option">
                        Tennessee
                    </a>
                </li>
                <li data-test-id="sbDeepOption50">
                    <a class=" filtered" href="javascript://" role="option">
                        Texas
                    </a>
                </li>
                <li data-test-id="sbDeepOption51">
                    <a class=" filtered" href="javascript://" role="option">
                        Utah
                    </a>
                </li>
                <li data-test-id="sbDeepOption52">
                    <a class=" filtered" href="javascript://" role="option">
                        Vermont
                    </a>
                </li>
                <li data-test-id="sbDeepOption53">
                    <a class=" filtered" href="javascript://" role="option">
                        Virgin Islands
                    </a>
                </li>
                <li data-test-id="sbDeepOption54">
                    <a class=" filtered" href="javascript://" role="option">
                        Virginia
                    </a>
                </li>
                <li data-test-id="sbDeepOption55">
                    <a class=" filtered" href="javascript://" role="option">
                        Washington
                    </a>
                </li>
                <li data-test-id="sbDeepOption56">
                    <a class=" filtered" href="javascript://" role="option">
                        West Virginia
                    </a>
                </li>
                <li data-test-id="sbDeepOption57">
                    <a class=" filtered" href="javascript://" role="option">
                        Wisconsin
                    </a>
                </li>
                <li data-test-id="sbDeepOption58">
                    <a class=" filtered" href="javascript://" role="option">
                        Wyoming
                    </a>
                </li>
            </ul>
            <button class="retain-focus sr-only"></button>
        </div>
    </div>
</div>
```

## Contributing

## License

## Code of Conduct

ember-unified-select conforms to Contributor Code of Conduct .
