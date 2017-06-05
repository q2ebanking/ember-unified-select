# ember-select-box

This README outlines the details of collaborating on this Ember addon.

## Installation

* `git clone <repository-url>` this repository
* `cd ember-select-box`
* `npm install`
* `bower install`

## Running Independently

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

## Running In Another App

In Ember project
* `npm link ember-select-box`
* call component in desired place with `{{select-box}}`
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
	{{select-box 
		selectId=state_select 
		options=statesArray 
		disabled=disabled 
		placeholder=placeholder 
		selected=selected 
		onchange=(action "onchange")
		valueKey=valueKey
		displayKey=displayKey
		labelId=labelId 
		nativeSelect=false
		label=labelText
	}}
```

yields 

```
<div id="ember858" class="select-box ember-view"><!----><div class="select-box__wrapper">
		<i class="icon-expand"></i>
		<input type="text" id="state_select" aria-labelled-by="state_label" readonly="true" class="mdl-textfield__input select-box__dropdown">
			<div class="select-box__dropdown-container searchable ">
				<ol class="select-box__dropdown-list ">
					<li data-test-id="sbDeepOption0"> <a href="#" class=" filtered" data-ember-action-859="859">Alabama</a></li>
					<li data-test-id="sbDeepOption1"> <a href="#" class=" filtered" data-ember-action-860="860">Alaska</a></li>
					<li data-test-id="sbDeepOption2"> <a href="#" class=" filtered" data-ember-action-861="861">Arizona</a></li>
					<li data-test-id="sbDeepOption3"> <a href="#" class=" filtered" data-ember-action-862="862">Arkansas</a></li>
					<li data-test-id="sbDeepOption4"> <a href="#" class=" filtered" data-ember-action-863="863">California</a></li>
					<li data-test-id="sbDeepOption5"> <a href="#" class=" filtered" data-ember-action-864="864">Colorado</a></li>
					<li data-test-id="sbDeepOption6"> <a href="#" class=" filtered" data-ember-action-865="865">Connecticut</a></li>
					<li data-test-id="sbDeepOption7"> <a href="#" class=" filtered" data-ember-action-866="866">Delaware</a></li>
					<li data-test-id="sbDeepOption8"> <a href="#" class=" filtered" data-ember-action-867="867">Florida</a></li>
					<li data-test-id="sbDeepOption9"> <a href="#" class=" filtered" data-ember-action-868="868">Georgia</a></li>
					<li data-test-id="sbDeepOption10"> <a href="#" class=" filtered" data-ember-action-869="869">Hawaii</a></li>
					<li data-test-id="sbDeepOption11"> <a href="#" class=" filtered" data-ember-action-870="870">Idaho</a></li>
					<li data-test-id="sbDeepOption12"> <a href="#" class=" filtered" data-ember-action-871="871">Illinois</a></li>
					<li data-test-id="sbDeepOption13"> <a href="#" class=" filtered" data-ember-action-872="872">Indiana</a></li>
					<li data-test-id="sbDeepOption14"> <a href="#" class=" filtered" data-ember-action-873="873">Iowa</a></li>
					<li data-test-id="sbDeepOption15"> <a href="#" class=" filtered" data-ember-action-874="874">Kansas</a></li>
					<li data-test-id="sbDeepOption16"> <a href="#" class=" filtered" data-ember-action-875="875">Kentucky</a></li>
					<li data-test-id="sbDeepOption17"> <a href="#" class=" filtered" data-ember-action-876="876">Louisiana</a></li>
					<li data-test-id="sbDeepOption18"> <a href="#" class=" filtered" data-ember-action-877="877">Maine</a></li>
					<li data-test-id="sbDeepOption19"> <a href="#" class=" filtered" data-ember-action-878="878">Maryland</a></li>
					<li data-test-id="sbDeepOption20"> <a href="#" class=" filtered" data-ember-action-879="879">Massachusetts</a></li>
					<li data-test-id="sbDeepOption21"> <a href="#" class=" filtered" data-ember-action-880="880">Michigan</a></li>
					<li data-test-id="sbDeepOption22"> <a href="#" class=" filtered" data-ember-action-881="881">Minnesota</a></li>
					<li data-test-id="sbDeepOption23"> <a href="#" class=" filtered" data-ember-action-882="882">Mississippi</a></li>
					<li data-test-id="sbDeepOption24"> <a href="#" class=" filtered" data-ember-action-883="883">Missouri</a></li>
					<li data-test-id="sbDeepOption25"> <a href="#" class=" filtered" data-ember-action-884="884">Montana</a></li>
					<li data-test-id="sbDeepOption26"> <a href="#" class=" filtered" data-ember-action-885="885">Nebraska</a></li>
					<li data-test-id="sbDeepOption27"> <a href="#" class=" filtered" data-ember-action-886="886">Nevada</a></li>
					<li data-test-id="sbDeepOption28"> <a href="#" class=" filtered" data-ember-action-887="887">New Hampshire</a></li>
					<li data-test-id="sbDeepOption29"> <a href="#" class=" filtered" data-ember-action-888="888">New Jersey</a></li>
					<li data-test-id="sbDeepOption30"> <a href="#" class=" filtered" data-ember-action-889="889">New Mexico</a></li>
					<li data-test-id="sbDeepOption31"> <a href="#" class=" filtered" data-ember-action-890="890">New York</a></li>
					<li data-test-id="sbDeepOption32"> <a href="#" class=" filtered" data-ember-action-891="891">North Carolina</a></li>
					<li data-test-id="sbDeepOption33"> <a href="#" class=" filtered" data-ember-action-892="892">North Dakota</a></li>
					<li data-test-id="sbDeepOption34"> <a href="#" class=" filtered" data-ember-action-893="893">Ohio</a></li>
					<li data-test-id="sbDeepOption35"> <a href="#" class=" filtered" data-ember-action-894="894">Oklahoma</a></li>
					<li data-test-id="sbDeepOption36"> <a href="#" class=" filtered" data-ember-action-895="895">Oregon</a></li>
					<li data-test-id="sbDeepOption37"> <a href="#" class=" filtered" data-ember-action-896="896">Pennsylvania</a></li>
					<li data-test-id="sbDeepOption38"> <a href="#" class=" filtered" data-ember-action-897="897">Rhode Island</a></li>
					<li data-test-id="sbDeepOption39"> <a href="#" class=" filtered" data-ember-action-898="898">South Carolina</a></li>
					<li data-test-id="sbDeepOption40"> <a href="#" class=" filtered" data-ember-action-899="899">South Dakota</a></li>
					<li data-test-id="sbDeepOption41"> <a href="#" class=" filtered" data-ember-action-900="900">Tennessee</a></li>
					<li data-test-id="sbDeepOption42"> <a href="#" class=" filtered" data-ember-action-901="901">Texas</a></li>
					<li data-test-id="sbDeepOption43"> <a href="#" class=" filtered" data-ember-action-902="902">Utah</a></li>
					<li data-test-id="sbDeepOption44"> <a href="#" class=" filtered" data-ember-action-903="903">Vermont</a></li>
					<li data-test-id="sbDeepOption45"> <a href="#" class=" filtered" data-ember-action-904="904">Virginia</a></li>
					<li data-test-id="sbDeepOption46"> <a href="#" class=" filtered" data-ember-action-905="905">Washington</a></li>
					<li data-test-id="sbDeepOption47"> <a href="#" class=" filtered" data-ember-action-906="906">West Virginia</a></li>
					<li data-test-id="sbDeepOption48"> <a href="#" class=" filtered" data-ember-action-907="907">Wisconsin</a></li>
					<li data-test-id="sbDeepOption49"> <a href="#" class=" filtered" data-ember-action-908="908">Wyoming</a></li>
			</ol>
		</div>
	</div>
</div>
```

## Contrbuting

## License

## Code of Conduct

ember-select-box conforms to Contributor Code of Conduct .
