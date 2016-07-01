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
		"color"			: "#399397",
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
			"endpointType"	: "JMS",
			"endpointVerb"	: "GET",
			"endpointSig"	: "{baseUri}/domain/{domainId}",
			"tags"			: ["domain"],
			"docLink"		: "http://localhost/docLink/TST1.DOMAIN.001"
		},{
			"id"			: "TST1.DOMAIN.002",
			"description"	: "Description for TST1.DOMAIN.002 service",
			"endpointType"	: "JMS",
			"endpointVerb"	: "GET",
			"endpointSig"	: "{baseUri}/domain2/{domainId}",
			"tags"			: ["domain"],
			"docLink"		: "http://localhost/docLink/TST1.DOMAIN.002"
		},{
			"id"			: "TST1.DOMAIN.003",
			"description"	: "Description for TST1.DOMAIN.003 service",
			"endpointType"	: "REST",
			"endpointVerb"	: "GET",
			"endpointSig"	: "{baseUri}/domain/{domainId}",
			"tags"			: ["domain"],
			"docLink"		: "http://localhost/docLink/TST1.DOMAIN.003"
		}],
		"dependsOn"		:
		[
			{"endpointId"	: "TST2.DOMAIN.001"}
		]
    },{
		"name"			: "Test System 2a",
		"acronym"		: "TST2",
		"description" 	: "Description for test stystem 2",
		"vendor"		: "Globex Corp",
		"version"		: "1.0",
		"docLink"	    : "http://localhost/doclink/tst2",
		"codeLink"		: "http://localhost/codeLink/tst2",
		"color"			: "#404040",
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
			"docLink"		: "http://localhost/docLink/TSTT.DOMAIN.001"
		},{
			"id"			: "TST2.DOMAIN.002",
			"description"	: "Description for TST2.DOMAIN.002 service",
			"endpointType"	: "REST",
			"endpointVerb"	: "GET",
			"endpointSig"	: "{baseUri}/domain2/{domainId}",
			"tags"			: ["domain"],
			"docLink"		: "http://localhost/docLink/TST2.DOMAIN.002"
		}],
		"dependsOn"		:
		[
			{"endpointId"	: "TST1.DOMAIN.001"},
			{"endpointId"	: "TST1.DOMAIN.002"}
		]
	},{
		"name"			: "Test System 3a",
		"acronym"		: "TST3",
		"description" 	: "Description for test stystem 3",
		"vendor"		: "Initech Corp",
		"version"		: "1.0",
		"docLink"	    : "http://localhost/doclink/tst3",
		"codeLink"		: "http://localhost/codeLink/tst3",
		"color"			: "#00B0F0",
		"techOwner"		: 
		[
			{
				"name" 	: "tim cook",
				"email"	: "tim.cook@initech.com"
			}
		],
		"technologies"  : [".NET","C#"],
		"services"    	:	
		[{
			"id"			: "TST3.DOMAIN.001",
			"description"	: "Description for TST3.DOMAIN.001 service",
			"endpointType"	: "REST",
			"endpointVerb"	: "GET",
			"endpointSig"	: "{baseUri}/domain/{domainId}",
			"tags"			: ["domain"],
			"docLink"		: "http://localhost/docLink/TST3.DOMAIN.001"
		},{
			"id"			: "TST3.DOMAIN.003",
			"description"	: "Description for TST3.DOMAIN.002 service",
			"endpointType"	: "REST",
			"endpointVerb"	: "GET",
			"endpointSig"	: "{baseUri}/domain2/{domainId}",
			"tags"			: ["domain"],
			"docLink"		: "http://localhost/docLink/TST3.DOMAIN.002"
		}],
		"dependsOn"		:
		[
			{"endpointId"	: "TST1.DOMAIN.001"},
			{"endpointId"	: "TST1.DOMAIN.002"},
			{"endpointId"	: "TST2.DOMAIN.001"},
			{"endpointId"	: "TST2.DOMAIN.002"},
			{"endpointId"	: "TST4.DOMAIN.001"},
			{"endpointId"	: "TST4.DOMAIN.002"}
		]
	},{
		"name"			: "Test System 4",
		"acronym"		: "TST4",
		"description" 	: "Description for test stystem 4",
		"vendor"		: "Umbrella Corp",
		"version"		: "1.0",
		"docLink"	    : "http://localhost/doclink/tst4",
		"codeLink"		: "http://localhost/codeLink/tst4",
		"color"			: "#ED7D31",
		"techOwner"		: 
		[
			{
				"name" 	: "Jim Jones",
				"email"	: "Jim.Jones@umbrella.com"
			}
		],
		"technologies"  : [".NET","C#"],
		"services"    	:	
		[{
			"id"			: "TST4.DOMAIN.001",
			"description"	: "Description for TST4.DOMAIN.001 service",
			"endpointType"	: "REST",
			"endpointVerb"	: "GET",
			"endpointSig"	: "{baseUri}/domain/{domainId}",
			"tags"			: ["domain"],
			"docLink"		: "http://localhost/docLink/TST4.DOMAIN.001"
		},{
			"id"			: "TST3.DOMAIN.004",
			"description"	: "Description for TST4.DOMAIN.002 service",
			"endpointType"	: "REST",
			"endpointVerb"	: "GET",
			"endpointSig"	: "{baseUri}/domain2/{domainId}",
			"tags"			: ["domain"],
			"docLink"		: "http://localhost/docLink/TST4.DOMAIN.002"
		}]
	}
  ]
}