{
  "components" : 
  [
    {
		"name"			: "Test System 1",
		"acronym"		: "TST1",
		"description" 	: "Description for test stystem 1",
		"vendor"		: "Acme",
		"version"		: "1.0",
		"docLink"	    : "http://localhost/doclink/tst1",
		"codeLink"		: "http://localhost/codeLink/tst1",
		"techOwner"		: 
		[
			{
				"name" 	: "john smith",
				"email"	: "john.smith@acme.com"
			}
		],
		"technologies"  : [".NET","Angular.js"],
		"services"    	:	
		[{
			"id"			: "TST1.DOMAIN.001",
			"description"	: "Description for TST1.DOMAIN.001 service",
			"endpointType"	: "REST",
			"endpointVerb"	: "GET",
			"endpointSig"	: "{baseUri}/domain/{domainId}",
			"tags"			: ["domain"],
			"docLink"		: "http://localhost/docLink/TST1.DOMAIN.001"
		},{
			"id"			: "TST1.DOMAIN.002",
			"description"	: "Description for TST1.DOMAIN.002 service",
			"endpointType"	: "REST",
			"endpointVerb"	: "GET",
			"endpointSig"	: "{baseUri}/domain2/{domainId}",
			"tags"			: ["domain"],
			"docLink"		: "http://localhost/docLink/TST1.DOMAIN.002"
		}],
		"dependsOn"		:
		[
			{"endpointId"	: "TST2.DOMAIN.001"}
		]
    },{
		"name"			: "Test System 2",
		"acronym"		: "TST2",
		"description" 	: "Description for test stystem 2",
		"vendor"		: "Globex Corp",
		"version"		: "1.0",
		"docLink"	    : "http://localhost/doclink/tst2",
		"codeLink"		: "http://localhost/codeLink/tst2",
		"techOwner"		: 
		[
			{
				"name" 	: "ron jackson",
				"email"	: "ron.jackson@globelx.com"
			}
		],
		"technologies"  : ["Java","JMS"],
		"services"    	:	
		[{
			"id"			: "TST2.DOMAIN.001",
			"description"	: "Description for TST2.DOMAIN.001 service",
			"endpointType"	: "REST",
			"endpointVerb"	: "GET",
			"endpointSig"	: "{baseUri}/domain/{domainId}",
			"tags"			: ["domain"],
			"docLink"		: "http://localhost/docLink/TST1.DOMAIN.001"
		},{
			"id"			: "TST2DOMAIN.002",
			"description"	: "Description for TST2.DOMAIN.002 service",
			"endpointType"	: "REST",
			"endpointVerb"	: "GET",
			"endpointSig"	: "{baseUri}/domain2/{domainId}",
			"tags"			: ["domain"],
			"docLink"		: "http://localhost/docLink/TST1.DOMAIN.002"
		}],
		"dependsOn"		:
		[
			{"endpointId"	: "TST1.DOMAIN.001"},
			{"endpointId"	: "TST1.DOMAIN.002"}
		]
	}
  ]
}