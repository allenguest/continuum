{
  "components" : 
  [
    {
		"name"			: "Addressing Information System",
		"acronym"		: "AIS",
		"description" 	: "Customer address management system",
		"vendor"		: "Shaw",
		"version"		: "4.0",
		"docLink"	    : "http://localhost/architecture/AIS",
		"codeLink"		: "https://Stash:7443/projects/AIS",
		"techOwner"		: 
		[
			{
				"name" 	: "Terry McAllister",
				"email"	: "Terry.McAllister@sjrb.ca"
			}
		],
		"technologies"  : [".NET","PL/SQL"],
		"services"    	:	
		[{
			"id"			: "AIS.ADDR.001",
			"description"	: "Get address details for a given service address by a Shaw addressid.",
			"endpointType"	: "REST",
			"endpointVerb"	: "GET",
			"endpointSig"	: "{baseUri}/address/{addressid}",
			"tags"			: ["address"],
			"docLink"		: "https://shawwiki.sjrb.ad/index.php?title=Service_Registry_-_Address_Information_v4.0#Get_Address_DETAILS"
		},{
			"id"			: "AIS.ADDR.002",
			"description"	: "Get area group details by Shaw branch and area.",
			"endpointType"	: "REST",
			"endpointVerb"	: "GET",
			"endpointSig"	: "{baseUri}/areagroup/{branch}/{area}",
			"tags"			: ["area","branch"],
			"docLink"		: "https://shawwiki.sjrb.ad/index.php?title=Service_Registry_-_Address_Information_v4.0#Retrieval_3"
		},{
			"id"			: "AIS.ADDR.003",
			"description"	: "",
			"endpointType"	: "JMS",
			"endpointVerb"	: "",
			"endpointSig"	: "AIS_Updates_Topic",
			"tags"			: [""],
			"docLink"		: "http://localhost/architecture/AIS/services#AIS.ADDR.003"
		},{
			"id"			: "AIS.ADDR.004",
			"description"	: "Returns a billing address in plain text format following Canada Post Guidelines by Shaw address id.",
			"endpointType"	: "REST",
			"endpointVerb"	: "GET",
			"endpointSig"	: "{baseUri}/address/{addressid}/postal",
			"tags"			: ["address"],
			"docLink" 		: "https://shawwiki.sjrb.ad/index.php?title=Service_Registry_-_Address_Information_v4.0#Get_POSTAL_ADDRESS"
		},{
			"id"			: "AIS.ADDR.005",
			"description"	: "",
			"endpointType"	: "REST",
			"endpointVerb"	: "GET",
			"endpointSig"	: "{baseUri}/status",
			"tags"			: [""],
			"docLink"		: "http://localhost/architecture/AIS/services#AIS.ADDR.005"			
		},{
			"id"			: "AIS.ADDR.006",
			"description"	: "Gets list of paginated drop details by Shaw address id.",
			"endpointType"	: "REST",
			"endpointVerb"	: "GET",
			"endpointSig"	: "{baseUri}/address/{addressid}/drops",
			"tags"			: ["address", "drop"],
			"docLink"		: "https://shawwiki.sjrb.ad/index.php?title=Service_Registry_-_Address_Information_v4.0#Retrieval_4"
		},{
			"id"			: "AIS.ADDR.007",
			"description"	: "Get drop notes by Shaw address or drop id.",
			"endpointType"	: "REST",
			"endpointVerb"	: "GET",
			"endpointSig"	: "{baseUri}/address/{addressid}/drop/{dropid}/notes",
			"tags"			: ["address", "drop", "notes"],
			"docLink"		: "http://localhost/architecture/AIS/services#AIS.ADDR.007"
		},{
			"id"			: "AIS.ADDR.008",
			"description"	: "Verify that a billing address is a valid Canada Post mailing address.",
			"endpointType"	: "REST",
			"endpointVerb"	: "GET",
			"endpointSig"	: "{baseUri}/addresses?{query}",
			"tags"			: ["address"],
			"docLink"		: "https://shawwiki.sjrb.ad/index.php?title=Service_Registry_-_Address_Information_v4.0#Verify_BILLING_Address"
		},{
			"id"			: "AIS.ADDR.009",
			"description"	: "Get list of cities where Shaw services are available",
			"endpointType"	: "REST",
			"endpointVerb"	: "GET",
			"endpointSig"	: "{baseUri}/cities/serviceable",
			"tags"			: ["address","service","cities"],
			"docLink"		: "https://shawwiki.sjrb.ad/index.php?title=Service_Registry_-_Address_Information_v4.0#Get_SERVICEABLE_Cities"	
		},{
			"id"			: "AIS.ADDR.010",
			"description"	: "Get list of valid street types",
			"endpointType"	: "REST",
			"endpointVerb"	: "GET",
			"endpointSig"	: "{baseUri}/streettypes",
			"tags"			: ["address","street"],
			"docLink"		: "https://shawwiki.sjrb.ad/index.php?title=Service_Registry_-_Address_Information_v4.0#Retrieval_9"	
		},{
			"id"			: "AIS.ADDR.011",
			"description"	: "Creates a note for a Shaw address and drop number.",
			"endpointType"	: "REST",
			"endpointVerb"	: "POST",
			"endpointSig"	: "{baseUri}/address/{addressid}/drop/{dropid}/notes",
			"tags"			: ["address","drop","note"],
			"docLink"		: "http://localhost/architecture/AIS/services#AIS.ADDR.011"	
		},{
			"id"			: "AIS.ADDR.012",
			"description"	: "Adds a drop to an address",
			"endpointType"	: "REST",
			"endpointVerb"	: "PUT",
			"endpointSig"	: "{baseUri}/address/{addressid}/drop/{dropid}",
			"tags"			: ["address","drop"],
			"docLink"		: "http://localhost/architecture/AIS/services#AIS.ADDR.012"
		},{
			"id"			: "AIS.ADDR.013",
			"description"	: "Gets area group details by Shaw address id.",
			"endpointType"	: "REST",
			"endpointVerb"	: "GET",
			"endpointSig"	: "{baseUri}/address/{addressid}/areagroup",
			"tags"			: ["address","area"],
			"docLink"		: "http://localhost/architecture/AIS/services#AIS.ADDR.013"
		},{
			"id"			: "AIS.ADDR.014",
			"description"	: "Returns the BLIF community by Shaw addressId.",
			"endpointType"	: "REST",
			"endpointVerb"	: "GET",
			"endpointSig"	: "{baseUri}/address/{addressid}/blif",
			"tags"			: ["address","BLIF"],
			"docLink"		: "https://shawwiki.sjrb.ad/index.php?title=Service_Registry_-_Address_Information_v4.0#Get_BLIF_COMMUNITY"	
		},{
			"id"			: "AIS.ADDR.015",
			"description"	: "Gets e911 address details for a Shaw address id.",
			"endpointType"	: "REST",
			"endpointVerb"	: "GET",
			"endpointSig"	: "{baseUri}/address/{addressid}/e911",
			"tags"			: ["address","911"],
			"docLink"		: "https://shawwiki.sjrb.ad/index.php?title=Service_Registry_-_Address_Information_v4.0#Retrieval_5"
		},{
			"id"			: "AIS.ADDR.016",
			"description"	: "Get list of cities.",
			"endpointType"	: "REST",
			"endpointVerb"	: "GET",
			"endpointSig"	: "{baseUri}/cities",
			"tags"			: ["address", "city"],
			"docLink"		: "https://shawwiki.sjrb.ad/index.php?title=Service_Registry_-_Address_Information_v4.0#Get_ALL_Cities"
		},{
			"id"			: "AIS.ADDR.017",
			"description"	: "Creates a billing address.",
			"endpointType"	: "REST",
			"endpointVerb"	: "POST",
			"endpointSig"	: "{baseUri}/addresses",
			"tags"			: ["address","billing"],
			"docLink"		: "https://shawwiki.sjrb.ad/index.php?title=Service_Registry_-_Address_Information_v4.0#Create_BILLING_Address"
		},{
			"id"			: "AIS.ADDR.018",
			"description"	: "Get address drop details by Shaw address or drop id.",
			"endpointType"	: "REST",
			"endpointVerb"	: "GET",
			"endpointSig"	: "{baseUri}/address/{addressid}/drop/{dropId}",
			"tags"			: ["address", "drop"],
			"docLink"		: "http://localhost/architecture/AIS/services#AIS.ADDR.018"
		},{
			"id"			: "AIS.ADDR.019",
			"description"	: "Returns address details for a service address by dropNumber.",
			"endpointType"	: "REST",
			"endpointVerb"	: "GET",
			"endpointSig"	: "{baseUri}/address/drop/{dropNumber}",
			"tags"			: ["address", "drop"],
			"docLink"		: "https://shawwiki.sjrb.ad/index.php?title=Service_Registry_-_Address_Information_v4.0#Get_Address_Details_by_DROP_NUMBER"
		},{
			"id"			: "AIS.ADDR.020",
			"description"	: "Returns paginated address details of all services addresses for a given street by Shaw streetid.",
			"endpointType"	: "REST",
			"endpointVerb"	: "GET",
			"endpointSig"	: "{baseUri}/street/{streetid}/addresses?{query}",
			"tags"			: ["address", "street"],
			"docLink"		: "https://shawwiki.sjrb.ad/index.php?title=Service_Registry_-_Address_Information_v4.0#Get_Addresses_on_STREET"
		},{
			"id"			: "AIS.ADDR.021",
			"description"	: "Returns paginated address details of all services addresses within a Postal Code.",
			"endpointType"	: "REST",
			"endpointVerb"	: "GET",
			"endpointSig"	: "{baseUri}/addresses/postalcode/{postalCode}?{query}",
			"tags"			: ["address", "postal"],
			"docLink"		: "https://shawwiki.sjrb.ad/index.php?title=Service_Registry_-_Address_Information_v4.0#Get_Addresses_in_a_POSTAL_CODE"
		},{
			"id"			: "AIS.ADDR.022",
			"description"	: "Returns paginated address details of all service addresses within a provided area group.",
			"endpointType"	: "REST",
			"endpointVerb"	: "GET",
			"endpointSig"	: "{baseUri}/addresses/areagroups?{query}",
			"tags"			: ["address", "area"],
			"docLink"		: "https://shawwiki.sjrb.ad/index.php?title=Service_Registry_-_Address_Information_v4.0#Get_Addresses_by_AREA_GROUP_INFORMATION"
		},{
			"id"			: "AIS.ADDR.023",
			"description"	: "Returns paginated address details of all service addresses located with a polygon.",
			"endpointType"	: "REST",
			"endpointVerb"	: "POST",
			"endpointSig"	: "{baseUri}/addresses/polygon",
			"tags"			: ["address"],
			"docLink"		: "https://shawwiki.sjrb.ad/index.php?title=Service_Registry_-_Address_Information_v4.0#Get_Addresses_in_a_POLYGON"
		},{
			"id"			: "AIS.ADDR.024",
			"description"	: "Updates a billing address using a Shaw address id.",
			"endpointType"	: "REST",
			"endpointVerb"	: "PUT",
			"endpointSig"	: "{baseUri}/address/{addressId}",
			"tags"			: ["address","billing"],
			"docLink"		: "https://shawwiki.sjrb.ad/index.php?title=Service_Registry_-_Address_Information_v4.0#Update_BILLING_Address"
		},{
			"id"			: "AIS.ADDR.025",
			"description"	: "Gets address class information by Shaw address class id.",
			"endpointType"	: "REST",
			"endpointVerb"	: "GET",
			"endpointSig"	: "{baseUri}/addressClass/{addressClassId}",
			"tags"			: ["address","address class"],
			"docLink"		: "https://shawwiki.sjrb.ad/index.php?title=Service_Registry_-_Address_Information_v4.0#Retrieval_2"
		},{
			"id"			: "AIS.ADDR.026",
			"description"	: "Gets list of area groups.",
			"endpointType"	: "REST",
			"endpointVerb"	: "GET",
			"endpointSig"	: "{baseUri}/areagroups",
			"tags"			: ["area"],
			"docLink"		: "http://localhost/architecture/AIS/services#AIS.ADDR.026"
		},{
			"id"			: "AIS.ADDR.027",
			"description"	: "Creates a drop for a Shaw address id.",
			"endpointType"	: "REST",
			"endpointVerb"	: "POST",
			"endpointSig"	: "{baseUri}/address/{addressId}/drops",
			"tags"			: ["address","drop"],
			"docLink"		: "https://shawwiki.sjrb.ad/index.php?title=Service_Registry_-_Address_Information_v4.0#Creation_2"
		},{
			"id"			: "AIS.ADDR.028",
			"description"	: "Updates a drop for a Shaw address and drop id.",
			"endpointType"	: "REST",
			"endpointVerb"	: "POST",
			"endpointSig"	: "{baseUri}/address/{addressId}/drop/{dropId}",
			"tags"			: ["address","drop"],
			"docLink"		: "https://shawwiki.sjrb.ad/index.php?title=Service_Registry_-_Address_Information_v4.0#Update_2"
		},{
			"id"			: "AIS.ADDR.029",
			"description"	: "Gets all rate groups.",
			"endpointType"	: "REST",
			"endpointVerb"	: "GET",
			"endpointSig"	: "{baseUri}/rategroups",
			"tags"			: ["rategroup"],
			"docLink"		: "https://shawwiki.sjrb.ad/index.php?title=Service_Registry_-_Address_Information_v4.0#Retrieval_6"
		},{
			"id"			: "AIS.ADDR.030",
			"description"	: "Get street details for a Shaw street id.",
			"endpointType"	: "REST",
			"endpointVerb"	: "GET",
			"endpointSig"	: "{baseUri}/street/{streetId}",
			"tags"			: ["street"],
			"docLink"		: "https://shawwiki.sjrb.ad/index.php?title=Service_Registry_-_Address_Information_v4.0#Retrieval_7"
		},{
			"id"			: "AIS.ADDR.031",
			"description"	: "Get street details based on a query.",
			"endpointType"	: "REST",
			"endpointVerb"	: "GET",
			"endpointSig"	: "{baseUri}/streets/{query}",
			"tags"			: ["street"],
			"docLink"		: "http://localhost/architecture/AIS/services#AIS.ADDR.031"
		},{
			"id"			: "AIS.ADDR.032",
			"description"	: "Get all available drop types.",
			"endpointType"	: "REST",
			"endpointVerb"	: "GET",
			"endpointSig"	: "{baseUri}/dropTypes",
			"tags"			: ["droptype"],
			"docLink"		: "https://shawwiki.sjrb.ad/index.php?title=Service_Registry_-_Address_Information_v4.0#Retrieval_10"
		},{
			"id"			: "AIS.ADDR.033",
			"description"	: "Get all countries.",
			"endpointType"	: "REST",
			"endpointVerb"	: "GET",
			"endpointSig"	: "{baseUri}/countries",
			"tags"			: ["country"],
			"docLink"		: "https://shawwiki.sjrb.ad/index.php?title=Service_Registry_-_Address_Information_v4.0#Retrieval_11"
		},{
			"id"			: "AIS.ADDR.034",
			"description"	: "Get billing address details based on an address query.",
			"endpointType"	: "REST",
			"endpointVerb"	: "GET",
			"endpointSig"	: "{baseUri}/billingaddresses?{query}",
			"tags"			: ["address"],
			"docLink"		: "https://shawwiki.sjrb.ad/index.php?title=Service_Registry_-_Address_Information_v4.0#Get_BILLING_ADDRESSES"
		}]
    },
	{
		"name"			: "Account Sync",
		"acronym"		: "AccSync",
		"description" 	: "Customer account synchronization between SBO and CBS",
		"vendor"		: "Shaw",
		"version"		: "",
		"docLink"	    : "http://localhost/architecture/AccSync",
		"codeLink"		: "",
		"techOwner"		: 
		[
			{
				"name" 	: "Chris Post",
				"email"	: "Chris.Post@sjrb.ca"
			}
		]
	},
	{
		"name"			: "Business Revenue Management Core",
		"acronym"		: "BRM",
		"description" 	: "",
		"vendor"		: "Oracle",
		"version"		: "",
		"docLink"	    : "http://localhost/architecture/BRM",
		"codeLink"		: "",
		"techOwner"		: 
		[
			{
				"name" 	: "James Gu",
				"email"	: "James.Gu@sjrb.ca"
			}
		],
		"technologies"  : ["C", "C++", "Java"],
		"services"    	:	
		[{
			"id"			: "BRM.CUST.001",
			"description"	: "",
			"endpointType"	: "",
			"endpointVerb"	: "SHW_OP_CDI_COMMIT_CUSTOMER",
			"endpointSig"	: "",
			"tags"			: ["address"],
			"docLink"		: "http://localhost/architecture/BRM/services#BRM.CUST.001"
		}],
		"dependsOn"		:
		[
			{"endpointId"	: "AIS.ADDR.001"},
			{"endpointId"	: "AIS.ADDR.002"},
			{"endpointId"	: "CDI.ACC.001"},
			{"endpointId"	: "CDI.CUST.001"},
			{"endpointId"	: "CDI.CUST.004"},
			{"endpointId"	: "CDI.CUST.010"},
			{"endpointId"	: "CDI.CUST.011"}
		]
	},
	{
		"name"			: "Business Revenue Management SOA",
		"acronym"		: "BRMSOA",
		"description" 	: "RESTFUL integration point for BRM",
		"vendor"		: "Shaw",
		"version"		: "4.1",
		"docLink"	    : "http://localhost/architecture/BRMSOA",
		"codeLink"		: "https://Stash:7443/projects/BRM",
		"techOwner"		: 
		[
			{
				"name" 	: "Justin White",
				"email"	: "Justin.White@sjrb.ca"
			}
		],
		"technologies"  : ["Java"],
		"services"    	: 
		[{
			"id"			: "BRMSOA.ACC.001",
			"description"	: "Get account information for a customer.",
			"endpointType"	: "REST",
			"endpointVerb"	: "GET",
			"endpointSig"	: "{baseUri}/account/{accountNumber}",
			"tags"			: ["customer","account"],
			"docLink"		: "https://shawwiki.sjrb.ad/index.php?title=Service_Registry_BRM_Billing_Service_4.1#Account"
		},{
			"id"			: "BRMSOA.ACC.002",
			"description"	: "Get account and event adjustment reason and reversal codes.",
			"endpointType"	: "REST",
			"endpointVerb"	: "GET",
			"endpointSig"	: "{baseUri}/reasonCodes",
			"tags"			: ["account","adjustment","reversal"],
			"docLink"		: "https://shawwiki.sjrb.ad/index.php?title=Service_Registry_BRM_Billing_Service_4.1#Reason_Codes"
		},{
			"id"			: "BRMSOA.ACC.003",
			"description"	: "Get transaction history for a customer account.",
			"endpointType"	: "REST",
			"endpointVerb"	: "GET",
			"endpointSig"	: "{baseUri}/account/{accountNumber}/transactionHistory/{date}/page/{pageNumber}",
			"tags"			: ["account","history","payment","adjustment","reversal","refund","write-off"],
			"docLink"		: "https://shawwiki.sjrb.ad/index.php?title=Service_Registry_BRM_Billing_Service_4.1#Transaction_History"
		},{
			"id"			: "BRMSOA.ACC.004",
			"description"	: "Get item details about a group of transaction history events.",
			"endpointType"	: "REST",
			"endpointVerb"	: "GET",
			"endpointSig"	: "{baseUri}/account/{accountNumber}/itemdetails/{encodedItemId}",
			"tags"			: ["account","history","item details"],
			"docLink"		: "https://shawwiki.sjrb.ad/index.php?title=Service_Registry_BRM_Billing_Service_4.1#Item_Details"
		},{
			"id"			: "BRMSOA.ACC.005",
			"description"	: "Get billing details for a customer account and billing period.",
			"endpointType"	: "REST",
			"endpointVerb"	: "GET",
			"endpointSig"	: "{baseUri}/account/{accountNumber}/bill/{encodedBillPoId}",
			"tags"			: ["account","history","billing details"],
			"docLink"		: "https://shawwiki.sjrb.ad/index.php?title=Service_Registry_BRM_Billing_Service_4.1#Bill_Details"
		},{
			"id"			: "BRMSOA.ACC.006",
			"description"	: "Get event details for a customer account.",
			"endpointType"	: "REST",
			"endpointVerb"	: "POST",
			"endpointSig"	: "{baseUri}/account/{accountNumber}/eventDetails",
			"tags"			: ["account","history","event details"],
			"docLink"		: "https://shawwiki.sjrb.ad/index.php?title=Service_Registry_BRM_Billing_Service_4.1#Event_Details"
		},{
			"id"			: "BRMSOA.ACC.007",
			"description"	: "Get pending items details for a customer account.",
			"endpointType"	: "REST",
			"endpointVerb"	: "GET",
			"endpointSig"	: "{baseUri}/account/{accountNumber}/pendingItems",
			"tags"			: ["account","history","pending details"],
			"docLink"		: "https://shawwiki.sjrb.ad/index.php?title=Service_Registry_BRM_Billing_Service_4.1#Pending_Items"
		},{
			"id"			: "BRMSOA.ACC.008",
			"description"	: "Adds a Beanstream token to a customer account.",
			"endpointType"	: "REST",
			"endpointVerb"	: "POST",
			"endpointSig"	: "{baseUri}/account/{accountNumber}/addToken",
			"tags"			: ["account","beanstream","token"],
			"docLink"		: "https://shawwiki.sjrb.ad/index.php?title=Service_Registry_BRM_Billing_Service_4.1#Add_Token"
		},{
			"id"			: "BRMSOA.ACC.009",
			"description"	: "Make a payment to a customer account.",
			"endpointType"	: "REST",
			"endpointVerb"	: "POST",
			"endpointSig"	: "{baseUri}/account/{accountNumber}/payment",
			"tags"			: ["account","payment"],
			"docLink"		: "https://shawwiki.sjrb.ad/index.php?title=Service_Registry_BRM_Billing_Service_4.1#Make_Payment"
		},{
			"id"			: "BRMSOA.ACC.010",
			"description"	: "Reverses a payment to a customer account.",
			"endpointType"	: "REST",
			"endpointVerb"	: "POST",
			"endpointSig"	: "{baseUri}/account/{accountNumber}/reversal",
			"tags"			: ["account","reversal"],
			"docLink"		: "https://shawwiki.sjrb.ad/index.php?title=Service_Registry_BRM_Billing_Service_4.1#Reverse_Payment"
		},{
			"id"			: "BRMSOA.ACC.011",
			"description"	: "Creates a refund to a customer account.",
			"endpointType"	: "REST",
			"endpointVerb"	: "POST",
			"endpointSig"	: "{baseUri}/account/{accountNumber}/refund",
			"tags"			: ["account","refund"],
			"docLink"		: "https://shawwiki.sjrb.ad/index.php?title=Service_Registry_BRM_Billing_Service_4.1#Create_Refund"
		},{
			"id"			: "BRMSOA.ACC.012",
			"description"	: "Cancels a refund made to a customer account.",
			"endpointType"	: "REST",
			"endpointVerb"	: "POST",
			"endpointSig"	: "{baseUri}/account/{accountNumber}/cancelRefund",
			"tags"			: ["account","refund","cancel"],
			"docLink"		: "https://shawwiki.sjrb.ad/index.php?title=Service_Registry_BRM_Billing_Service_4.1#Cancel_Refund"
		},{
			"id"			: "BRMSOA.ACC.013",
			"description"	: "Make an adjustment to a customer account.",
			"endpointType"	: "REST",
			"endpointVerb"	: "POST",
			"endpointSig"	: "{baseUri}/account/{accountNumber}/accountAdjustment",
			"tags"			: ["account","adjustment"],
			"docLink"		: "https://shawwiki.sjrb.ad/index.php?title=Service_Registry_BRM_Billing_Service_4.1#Account_Adjustment"
		},{
			"id"			: "BRMSOA.ACC.014",
			"description"	: "Make an adjustment on an account for a specific set of event(s).",
			"endpointType"	: "REST",
			"endpointVerb"	: "POST",
			"endpointSig"	: "{baseUri}/account/{accountNumber}/eventAdjustment",
			"tags"			: ["account","adjustment","event"],
			"docLink"		: "https://shawwiki.sjrb.ad/index.php?title=Service_Registry_BRM_Billing_Service_4.1#Event_Adjustment"
		},{
			"id"			: "BRMSOA.ACC.015",
			"description"	: "Write off an amount on a customer account.",
			"endpointType"	: "REST",
			"endpointVerb"	: "POST",
			"endpointSig"	: "{baseUri}/account/{accountNumber}/writeoff",
			"tags"			: ["account","write off"],
			"docLink"		: "https://shawwiki.sjrb.ad/index.php?title=Service_Registry_BRM_Billing_Service_4.1#Write_Off"
		},{
			"id"			: "BRMSOA.ACC.016",
			"description"	: "Gets remaining minutes left on a customers long distance plans.",
			"endpointType"	: "REST",
			"endpointVerb"	: "GET",
			"endpointSig"	: "{baseUri}/account/{accountNumber}/longDistanceUsage",
			"tags"			: ["account","usage","long distance"],
			"docLink"		: "https://shawwiki.sjrb.ad/index.php?title=Service_Registry_BRM_Billing_Service_4.1#Long_Distance_Usage"
		},{
			"id"			: "BRMSOA.ACC.017",
			"description"	: "Gets remaining coupons for a customer account.",
			"endpointType"	: "REST",
			"endpointVerb"	: "GET",
			"endpointSig"	: "{baseUri}/account/{accountNumber}/couponsremaining",
			"tags"			: ["account","coupon"],
			"docLink"		: "https://shawwiki.sjrb.ad/index.php?title=Service_Registry_BRM_Billing_Service_4.1#Coupons_Remaining"
		},{
			"id"			: "BRMSOA.ACC.018",
			"description"	: "Gets all coupons and their corresponding status for a customer account.",
			"endpointType"	: "REST",
			"endpointVerb"	: "GET",
			"endpointSig"	: "{baseUri}/account/{accountNumber}/couponshistory",
			"tags"			: ["account","coupon"],
			"docLink"		: "https://shawwiki.sjrb.ad/index.php?title=Service_Registry_BRM_Billing_Service_4.1#Coupons_History"
		},{
			"id"			: "BRMSOA.ACC.019",
			"description"	: "Gets the list of existing collection actions for a customer.",
			"endpointType"	: "REST",
			"endpointVerb"	: "GET",
			"endpointSig"	: "{baseUri}/account/{accountNumber}/collectionactions",
			"tags"			: ["account","collection"],
			"docLink"		: "https://shawwiki.sjrb.ad/index.php?title=Service_Registry_BRM_Billing_Service_4.1#Collection_Actions"
		},{
			"id"			: "BRMSOA.USG.001",
			"description"	: "Gets amount of aggregated internet usage for the last 180 days for a customer.",
			"endpointType"	: "REST",
			"endpointVerb"	: "GET",
			"endpointSig"	: "{baseUri}/account/{accountNumber}/internetUsage",
			"tags"			: ["account","usage","internet"],
			"docLink"		: "https://shawwiki.sjrb.ad/index.php?title=Service_Registry_BRM_Billing_Service_4.1#Internet_Usage_Summary"
		},{
			"id"			: "BRMSOA.USG.002",
			"description"	: "Gets daily internet usage by date range for a customer account.",
			"endpointType"	: "REST",
			"endpointVerb"	: "GET",
			"endpointSig"	: "{baseUri}/account/{accountNumber}/internetUsageDetails/{startDate}/{endDate}",
			"tags"			: ["account","usage","internet"],
			"docLink"		: "https://shawwiki.sjrb.ad/index.php?title=Service_Registry_BRM_Billing_Service_4.1#Internet_Usage_Details"
		},{
			"id"			: "BRMSOA.OEM.001",
			"description"	: "Create a customer account.",
			"endpointType"	: "REST",
			"endpointVerb"	: "POST",
			"endpointSig"	: "{baseUri}/createCustomer",
			"tags"			: ["account","customer"],
			"docLink"		: "https://shawwiki.sjrb.ad/index.php?title=Service_Registry_BRM_Billing_Service_4.1#Create_Customer"
		},{
			"id"			: "BRMSOA.OEM.002",
			"description"	: "Create a customer order.",
			"endpointType"	: "JMS",
			"endpointVerb"	: "",
			"endpointSig"	: "BRM_CustOrderRequest",
			"tags"			: ["account","customer","order"],
			"docLink"		: "https://shawwiki.sjrb.ad/index.php?title=Service_Registry_BRM_Billing_Service_4.1#Customer_Order"
		},{
			"id"			: "BRMSOA.OEM.003",
			"description"	: "Swap out customer hardware.",
			"endpointType"	: "REST",
			"endpointVerb"	: "POST",
			"endpointSig"	: "{baseUri}/account/{account}/hardwareSwap",
			"tags"			: ["customer","hardware"],
			"docLink"		: "https://shawwiki.sjrb.ad/index.php?title=Service_Registry_BRM_Billing_Service_4.1#Hardware_Swap"
		},{
			"id"			: "BRMSOA.INV.001",
			"description"	: "Update invoice deal/plan descriptions.",
			"endpointType"	: "REST",
			"endpointVerb"	: "POST",
			"endpointSig"	: "{baseUri}/update/invoice",
			"tags"			: ["invoice", "deal", "plan"],
			"docLink"		: "https://shawwiki.sjrb.ad/index.php?title=Service_Registry_BRM_Billing_Service_4.1#Invoice_Update_for_Plans_and_Deals"
		},{
			"id"			: "BRMSOA.INV.002",
			"description"	: "Gets number of times a customer has been charged for each seasonal package.",
			"endpointType"	: "REST",
			"endpointVerb"	: "GET",
			"endpointSig"	: "{baseUri}/account/{accountNumber}/seasonalPackages/chargedEvents",
			"tags"			: ["customer","seasonal"],
			"docLink"		: "https://shawwiki.sjrb.ad/index.php?title=Service_Registry_BRM_Billing_Service_4.1#Seasonal_Packages_Charged_Events"
		},{
			"id"			: "BRMSOA.PRDCT.001",
			"description"	: "Import entire product catalog.",
			"endpointType"	: "REST",
			"endpointVerb"	: "GET",
			"endpointSig"	: "{baseUri}/productCatalog/import",
			"tags"			: ["product catalog", "import"],
			"docLink"		: "https://shawwiki.sjrb.ad/index.php?title=Service_Registry_BRM_Billing_Service_4.1#Hardware_Swap"
		},{
			"id"			: "BRMSOA.PRDCT.002",
			"description"	: "Resyncs BRM core product database from BRM-SOA.",
			"endpointType"	: "REST",
			"endpointVerb"	: "POST",
			"endpointSig"	: "{baseUri}/brmCoreRefresh/{verboseFlag}",
			"tags"			: ["product", "import", "sync"],
			"docLink"		: "https://shawwiki.sjrb.ad/index.php?title=Service_Registry_BRM_Billing_Service_4.1#Refresh_BrmCore"
		},{
			"id"			: "BRMSOA.JMS.001",
			"description"	: "Starts or Stops all JMS connection listeners.",
			"endpointType"	: "REST",
			"endpointVerb"	: "POST",
			"endpointSig"	: "{baseUri}/jmsConnection/{start/stop}",
			"tags"			: ["jms"],
			"docLink"		: "https://shawwiki.sjrb.ad/index.php?title=Service_Registry_BRM_Billing_Service_4.1#Jms_Listeners"
		},{
			"id"			: "BRMSOA.RPT.001",
			"description"	: "Gets transaction details for the retail cash drawer.",
			"endpointType"	: "REST",
			"endpointVerb"	: "GET",
			"endpointSig"	: "{baseUri}/reports/retail/cashDrawer",
			"tags"			: ["jms"],
			"docLink"		: "https://shawwiki.sjrb.ad/index.php?title=Service_Registry_BRM_Billing_Service_4.1#Retail:_Cash_Drawer"
		},{
			"id"			: "BRMSOA.RPT.002",
			"description"	: "Gets transaction details for a specific retail location.",
			"endpointType"	: "REST",
			"endpointVerb"	: "GET",
			"endpointSig"	: "{baseUri}/reports/retail",
			"tags"			: ["jms"],
			"docLink"		: "https://shawwiki.sjrb.ad/index.php?title=Service_Registry_BRM_Billing_Service_4.1#Retail:_Store"
		},{
			"id"			: "BRMSOA.CNFG.001",
			"description"	: "Gets the current version of BRM and BRM SOA.",
			"endpointType"	: "REST",
			"endpointVerb"	: "GET",
			"endpointSig"	: "{baseUri}/status",
			"tags"			: ["Status", "version", "internal"],
			"docLink"		: "https://shawwiki.sjrb.ad/index.php?title=Service_Registry_BRM_Billing_Service_4.1#Status"
		},{
			"id"			: "BRMSOA.CNFG.002",
			"description"	: "Endpoing used by load balancer to identify that this service is running.",
			"endpointType"	: "REST",
			"endpointVerb"	: "GET",
			"endpointSig"	: "{baseUri}/admin/healthCheck.jsp",
			"tags"			: ["status", "health", "internal"],
			"docLink"		: "https://shawwiki.sjrb.ad/index.php?title=Service_Registry_BRM_Billing_Service_4.1#Health_Check"
		},{
			"id"			: "BRMSOA.CNFG.003",
			"description"	: "Tests the Kerberos security configuration for BRM-SOA by fetching the content of the specified URL in the request body.",
			"endpointType"	: "REST",
			"endpointVerb"	: "GET",
			"endpointSig"	: "{baseUri}/security",
			"tags"			: ["Status","security","kerberos","test","internal"],
			"docLink"		: "https://shawwiki.sjrb.ad/index.php?title=Service_Registry_BRM_Billing_Service_4.1#Security"
		},{
			"id"			: "BRMSOA.CNFG.004",
			"description"	: "Sets the BRM-SOA clock ahead or back for testing scenarios.",
			"endpointType"	: "REST",
			"endpointVerb"	: "GET",
			"endpointSig"	: "{baseUri}/system/timeOffset/months/{monthOffset}",
			"tags"			: ["Status","test","internal"],
			"docLink"		: "https://shawwiki.sjrb.ad/index.php?title=Service_Registry_BRM_Billing_Service_4.1#System_Time_Offset"
		},{
			"id"			: "BRMSOA.CNFG.005",
			"description"	: "Gets all of the configuration properites that are currently deployed.",
			"endpointType"	: "REST",
			"endpointVerb"	: "GET",
			"endpointSig"	: "{baseUri}/configuration",
			"tags"			: ["Status","internal"],
			"docLink"		: "https://shawwiki.sjrb.ad/index.php?title=Service_Registry_BRM_Billing_Service_4.1#Configuration"
		},{
			"id"			: "BRMSOA.CNFG.007",
			"description"	: "Starts the ARU process that sends files from BRM to the dailer and creates notes in CDI for all affected accounts.",
			"endpointType"	: "REST",
			"endpointVerb"	: "GET",
			"endpointSig"	: "{baseUri}/aru/import/{start/stop}",
			"tags"			: ["Status","intenal"],
			"docLink"		: "https://shawwiki.sjrb.ad/index.php?title=Service_Registry_BRM_Billing_Service_4.1#ARU_File_Processing"
		}],
		"dependsOn"		:
		[
			{"endpointId"	: "AIS.ADDR.001"},
			{"endpointId"	: "AIS.ADDR.002"},
			{"endpointId"	: "AIS.ADDR.003"},
			{"endpointId"	: "CDI.ACC.001"},
			{"endpointId"	: "BRM.CUST.001"}
		]
	},
	{
		"name"			: "Customer Billing System",
		"acronym"		: "CBS",
		"description" 	: "",
		"vendor"		: "",
		"version"		: "",
		"docLink"	    : "http://localhost/architecture/CBS",
		"codeLink"		: ""
	},
	{
		"name"			: "Change Data Captured",
		"acronym"		: "CDC",
		"description" 	: "",
		"vendor"		: "",
		"version"		: "",
		"docLink"	    : "http://localhost/architecture/CDC",
		"codeLink"		: ""
	},
	{
		"name"			: "Credential Service",
		"acronym"		: "CRED-SVC",
		"description" 	: "Stores encrypted information about user accounts and preferences.",
		"vendor"		: "Shaw",
		"version"		: "4.2.1",
		"docLink"	    : "https://shawwiki.sjrb.ad/index.php?title=Service_Registry_-_UD_Credentials_Service_v4.2",
		"codeLink"		: "https://teamcity.oss.prd/project.html?projectId=project19&tab=projectOverview",
		"techOwner"		: 
		[
			{
				"name" 	: "Sean Bennett",
				"email"	: "Sean.Bennett@sjrb.ca"
			}
		],
		"technologies"  : ["Java"],
		"services"    	: 
		[{
			"id"			: "CRED-SVC.USER.001",
			"description"	: "Gets a user's wallet.",
			"endpointType"	: "REST",
			"endpointVerb"	: "GET",
			"endpointSig"	: "{baseUri}/wallet",
			"tags"			: ["user","wallet"],
			"docLink"		: "https://shawwiki.sjrb.ad/index.php?title=Service_Registry_-_UD_Credentials_Service_v4.2#Wallet"
		},{
			"id"			: "CRED-SVC.USER.002",
			"description"	: "Saves a user's wallet.",
			"endpointType"	: "REST",
			"endpointVerb"	: "POST",
			"endpointSig"	: "{baseUri}/wallet",
			"tags"			: ["user","wallet"],
			"docLink"		: "https://shawwiki.sjrb.ad/index.php?title=Service_Registry_-_UD_Credentials_Service_v4.2#Save"
		},{
			"id"			: "CRED-SVC.USER.003",
			"description"	: "Gets user preference.",
			"endpointType"	: "REST",
			"endpointVerb"	: "GET",
			"endpointSig"	: "{baseUri}/preferences",
			"tags"			: ["user","preference"],
			"docLink"		: "https://shawwiki.sjrb.ad/index.php?title=Service_Registry_-_UD_Credentials_Service_v4.2#Get_3"
		},{
			"id"			: "CRED-SVC.USER.004",
			"description"	: "Saves user preferences.",
			"endpointType"	: "REST",
			"endpointVerb"	: "POST",
			"endpointSig"	: "{baseUri}/preferences",
			"tags"			: ["user","preference"],
			"docLink"		: "https://shawwiki.sjrb.ad/index.php?title=Service_Registry_-_UD_Credentials_Service_v4.2#Save_2"
		}]
	},
	{
		"name"			: "Customer Data Information",
		"acronym"		: "CDI",
		"description" 	: "Something about customer data",
		"vendor"		: "Shaw",
		"version"		: "4.3",
		"docLink"	    : "https://shawwiki.sjrb.ad/index.php?title=Service_Registry_-_Customer_Management_4.3",
		"codeLink"		: "https://Stash:7443/projects/CDI",
		"techOwner"		: 
		[
			{
				"name" 	: "Sean Bennett",
				"email"	: "Sean.Bennett@sjrb.ca"
			}
		],
		"technologies"  : [".NET"],
		"services"    	: 
		[{
			"id"			: "CDI.CUST.001",
			"description"	: "Get a customer by customer Id.",
			"endpointType"	: "REST",
			"endpointVerb"	: "GET",
			"endpointSig"	: "{baseUri}/customers/{Id}",
			"tags"			: ["customer","account"],
			"docLink"		: "https://shawwiki.sjrb.ad/index.php?title=Service_Registry_-_Customer_Management_2010_3.8#Get"
		},{
			"id"			: "CDI.CUST.002",
			"description"	: "Create a customer.",
			"endpointType"	: "REST",
			"endpointVerb"	: "POST",
			"endpointSig"	: "{baseUri}/customers",
			"tags"			: ["customer","account"],
			"docLink"		: "https://shawwiki.sjrb.ad/index.php?title=Service_Registry_-_Customer_Management_2010_3.8#Create_Customer"
		},{
			"id"			: "CDI.CUST.003",
			"description"	: "Update a customer.",
			"endpointType"	: "REST",
			"endpointVerb"	: "POST",
			"endpointSig"	: "{baseUri}/customers",
			"tags"			: ["customer","account"],
			"docLink"		: "https://shawwiki.sjrb.ad/index.php?title=Service_Registry_-_Customer_Management_2010_3.8#Update_Customer"
		},{
			"id"			: "CDI.CUST.004",
			"description"	: "Create authorized customer contact.",
			"endpointType"	: "REST",
			"endpointVerb"	: "POST",
			"endpointSig"	: "{baseUri}/customers/{customerId}/authorizedContact",
			"tags"			: ["customer","account","contact"],
			"docLink"		: "https://shawwiki.sjrb.ad/index.php?title=Service_Registry_-_Customer_Management_2010_3.8#Update_Customer"
		},{
			"id"			: "CDI.ACC.001",
			"description"	: "Get account information for a customer",
			"endpointType"	: "REST",
			"endpointVerb"	: "GET",
			"endpointSig"	: "{baseUri}/accounts/{accountId}",
			"tags"			: ["customer","account"],
			"docLink"		: "https://shawwiki.sjrb.ad/index.php?title=Service_Registry_-_Customer_Management_4.3#Get_Account"	
		},{
			"id"			: "CDI.ACC.002",
			"description"	: "Search for customer using a query.",
			"endpointType"	: "REST",
			"endpointVerb"	: "GET",
			"endpointSig"	: "{baseUri}/customers?{query}",
			"tags"			: ["customer","account"],
			"docLink"		: "https://shawwiki.sjrb.ad/index.php?title=Service_Registry_-_Customer_Management_2010_3.8#Search_for_Customers"	
		},{
			"id"			: "CDI.ACC.003",
			"description"	: "Create a customer account.",
			"endpointType"	: "REST",
			"endpointVerb"	: "POST",
			"endpointSig"	: "{baseUri}/customers/{customerId}/accounts",
			"tags"			: ["customer","account"],
			"docLink"		: "https://shawwiki.sjrb.ad/index.php?title=Service_Registry_-_Customer_Management_2010_3.8#Create_Account"	
		},{
			"id"			: "CDI.ACC.004",
			"description"	: "Update a customer account.",
			"endpointType"	: "REST",
			"endpointVerb"	: "POST",
			"endpointSig"	: "{baseUri}/accounts/{accountId}",
			"tags"			: ["customer","account"],
			"docLink"		: "https://shawwiki.sjrb.ad/index.php?title=Service_Registry_-_Customer_Management_2010_3.8#Update_Account"	
		},{
			"id"			: "CDI.ACC.005",
			"description"	: "Intialize the bill cycle for a customer account.",
			"endpointType"	: "REST",
			"endpointVerb"	: "POST",
			"endpointSig"	: "{baseUri}/accounts/{accountId}/initializeBillCycle",
			"tags"			: ["customer","account","bill cycle"],
			"docLink"		: "https://shawwiki.sjrb.ad/index.php?title=Service_Registry_-_Customer_Management_2010_3.8#Initialize_Bill_Cycle"	
		},{
			"id"			: "CDI.ACC.006",
			"description"	: "Sets the status of a customer account.",
			"endpointType"	: "REST",
			"endpointVerb"	: "POST",
			"endpointSig"	: "{baseUri}/accounts/{accountId}/status/{activate/deactivate}",
			"tags"			: ["customer","account","status"],
			"docLink"		: "https://shawwiki.sjrb.ad/index.php?title=Service_Registry_-_Customer_Management_2010_3.8#Account_Status"	
		},{
			"id"			: "CDI.ACC.007",
			"description"	: "Adds a note to a customer account.",
			"endpointType"	: "REST",
			"endpointVerb"	: "POST",
			"endpointSig"	: "{baseUri}/accounts/{accountId}/notes",
			"tags"			: ["customer","account","note"],
			"docLink"		: "https://shawwiki.sjrb.ad/index.php?title=Service_Registry_-_Customer_Management_2010_3.8#Add_Note"	
		},{
			"id"			: "CDI.ACC.008",
			"description"	: "Updates a note on a customer account.",
			"endpointType"	: "REST",
			"endpointVerb"	: "POST",
			"endpointSig"	: "{baseUri}/accounts/{accountId}/notes/{noteId}",
			"tags"			: ["customer","account","note"],
			"docLink"		: "https://shawwiki.sjrb.ad/index.php?title=Service_Registry_-_Customer_Management_2010_3.8#Update_Note"	
		},{
			"id"			: "CDI.ACC.009",
			"description"	: "Deletes a note on a customer account.",
			"endpointType"	: "REST",
			"endpointVerb"	: "DELETE",
			"endpointSig"	: "<i>Resolve from CDI.ACC.001 response.</i>",
			"tags"			: ["customer","account","note"],
			"docLink"		: "https://shawwiki.sjrb.ad/index.php?title=Service_Registry_-_Customer_Management_2010_3.8#Delete_Note"
		},{
			"id"			: "CDI.ACC.010",
			"description"	: "Add a deliquency note to multiple accounts.",
			"endpointType"	: "REST",
			"endpointVerb"	: "POST",
			"endpointSig"	: "<i>Resolve from CDI.ACC.001 response.</i>",
			"tags"			: ["customer","account","deliquency","note"],
			"docLink"		: "https://shawwiki.sjrb.ad/index.php?title=Service_Registry_-_Customer_Management_2010_3.8#Delete_Note"
		},{
			"id"			: "CDI.ACC.011",
			"description"	: "Add a deliquency note to a customer account.",
			"endpointType"	: "REST",
			"endpointVerb"	: "POST",
			"endpointSig"	: "<i>Resolve from CDI.ACC.001 response.</i>",
			"tags"			: ["customer","account","deliquency","note"],
			"docLink"		: "https://shawwiki.sjrb.ad/index.php?title=Service_Registry_-_Customer_Management_2010_3.8#Add_Delinquency_Note"
		},{
			"id"			: "CDI.ACC.012",
			"description"	: "Cancels a payment arrangement for a customer account.",
			"endpointType"	: "REST",
			"endpointVerb"	: "POST",
			"endpointSig"	: "<i>Resolve from CDI.ACC.011 response.</i>",
			"tags"			: ["customer","account","payment","cancel"],
			"docLink"		: "https://shawwiki.sjrb.ad/index.php?title=Service_Registry_-_Customer_Management_2010_3.8#Cancel_payment_arrangement"
		}],
		"dependsOn"		:
		[
			{"endpointId"	: "AIS.ADDR.001"}
		]
	},
	{
		"name"			: "Customer Provisioning Equipment",
		"acronym"		: "CPE",
		"description" 	: "Something about equipment provisioing",
		"vendor"		: "Shaw",
		"version"		: "",
		"docLink"	    : "http://localhost/architecture/CPE",
		"codeLink"		: "https://Stash:7443/projects/CIC",
		"techOwner"		: 
		[
			{
				"name" 	: "Aris Jardinero",
				"email"	: "Aris.Jardinero@sjrb.ca"
			}
		],
		"technologies"  : [".NET"],
		"dependsOn"		:
		[
			{"endpointId"	: "AIS.ADDR.001"},
			{"endpointId"	: "AIS.ADDR.002"},
			{"endpointId"	: "CDI.ACC.001"},
			{"endpointId"	: "CDI.CUST.001"}
		]
	},
	{
		"name"			: "Enterprise Service Bus",
		"acronym"		: "ESB",
		"description" 	: "",
		"vendor"		: "Oracle",
		"version"		: "",
		"docLink"	    : "http://localhost/architecture/ESB",
		"codeLink"		: "",
		"techOwner"		: 
		[
			{
				"name" 	: "Jason Kriese",
				"email"	: "Jason.Kriese@sjrb.ca"
			}
		],
		"dependsOn"		:
		[
			{"endpointId"	: "AIS.ADDR.001"},
			{"endpointId"	: "AIS.ADDR.004"},
			{"endpointId"	: "AIS.ADDR.005"},
			{"endpointId"	: "CIS.ADDR.001"},
			{"endpointId"	: "CDI.ACC.001"}
		]
	},
	{
		"name"			: "Entitlement Management System",
		"acronym"		: "EMS",
		"description" 	: "",
		"vendor"		: "",
		"version"		: "",
		"docLink"	    : "http://localhost/architecture/EMS",
		"codeLink"		: ""
	},
	{
		"name"			: "Field Force Management",
		"acronym"		: "FFM",
		"description" 	: "Something about field force management",
		"vendor"		: "Shaw",
		"version"		: "",
		"docLink"	    : "http://localhost/architecture/FFM",
		"codeLink"		: "",
		"techOwner"		: 
		[
			{
				"name" 	: "Jeff Lu",
				"email"	: "Jeff.Lu@sjrb.ca"
			}
		],
		"technologies"  : [".NET"],
		"dependsOn"		:
		[
			{"endpointId"	: "AIS.ADDR.028"},
			{"endpointId"	: "CDI.ACC.001"},
			{"endpointId"	: "CDI.ACC.002"},
			{"endpointId"	: "CDI.CUST.001"}
		]
	},
	{
		"name"			: "Field Force Management SOA",
		"acronym"		: "FFMSOA",
		"description" 	: "",
		"vendor"		: "Shaw",
		"version"		: "",
		"docLink"	    : "http://localhost/architecture/FFMSOA",
		"codeLink"		: "",
		"techOwner"		: 
		[
			{
				"name" 	: "Jeff Lu",
				"email"	: "Jeff.Lu@sjrb.ca"
			}
		],
		"technologies"  : [".NET"]
	},
	{
		"name"			: "HP Service Activator",
		"acronym"		: "HPSA",
		"description" 	: "Something about a workflow engine?",
		"vendor"		: "NetCracker",
		"version"		: "",
		"docLink"	    : "http://localhost/architecture/OM",
		"codeLink"		: "https://Stash:7443/projects/EP",
		"techOwner"		: 
		[
			{"name" 	: "Prasanna Wickramasinghe"},
			{"email"	: "Prasanna.Wickramasinghe@sjrb.ca"}
		],
		"technologies"  : ["Java"]
    },
	{
		"name"			: "Inventory",
		"acronym"		: "TN",
		"description" 	: "Something about inventory",
		"vendor"		: "Shaw",
		"version"		: "",
		"docLink"	    : "http://localhost/architecture/TN",
		"codeLink"		: "https://Stash:7443/projects/CIT",
		"techOwner"		: 
		[
			{
				"name" 	: "Aris Jardinero",
				"email"	: "Aris.Jardinero@sjrb.ca"
			}
		],
		"technologies"  : [".NET"]
	},
	{
		"name"			: "Java Messaging Service",
		"acronym"		: "JMS",
		"description" 	: "",
		"vendor"		: "",
		"version"		: "",
		"docLink"	    : "http://localhost/architecture/JMS",
		"codeLink"		: "https://svn.oss.prd/repos/SHAW/Services/JmsService",
		"technologies"  : [".NET"]
	},
	{
		"name"			: "Location Management Service",
		"acronym"		: "LMS",
		"description" 	: "Something about LMS?",
		"vendor"		: "",
		"version"		: "",
		"docLink"	    : "http://localhost/architecture/LMS",
		"codeLink"		: "https://stash:7443/projects/CLMS",
		"techOwner"		: 
		[
			{
				"name" 	: "Justin White",
				"email"	: "Justin.White@sjrb.ca"
			}
		],
		"technologies"  : [".NET"]
    },
	{
		"name"			: "My Account",
		"acronym"		: "MyAcc",
		"description" 	: "Shaw customer portal",
		"vendor"		: "Shaw",
		"version"		: "",
		"docLink"	    : "http://localhost/architecture/MyAcc",
		"codeLink"		: "",
		"technologies"  : [".NET", "Javascript"]
	},
    {
		"name"			: "Order Entry",
		"acronym"		: "OE",
		"description" 	: "NetCracker order entry system",
		"vendor"		: "NetCracker",
		"version"		: "",
		"docLink"	    : "http://localhost/architecture/OE",
		"codeLink"		: "https://stash:7443/projects/et-fss",
		"techOwner"		: 
		[
			{
				"name" 	: "Jason Anderson",
				"email"	: "Jason.Anderson@sjrb.ca"
			}
		],
		"technologies"  : ["Java", "Javascript", "T-SQL"],
		"dependsOn"		:
		[
			{"endpointId"	: "AIS.ADDR.001"},
			{"endpointId"	: "AIS.ADDR.013"},
			{"endpointId"	: "AIS.ADDR.014"},
			{"endpointId"	: "AIS.ADDR.018"},
			{"endpointId"	: "AIS.ADDR.015"},
			{"endpointId"	: "AIS.ADDR.016"},
			{"endpointId"	: "AIS.ADDR.010"},
			{"endpointId"	: "AIS.ADDR.017"},
			{"endpointId"	: "CIS.ADDR.001"},
			{"endpointId"	: "CIS.ADDR.002"},
			{"endpointId"	: "CDI.ACC.001"},
			{"endpointId"	: "CDI.ACC.002"},
			{"endpointId"	: "CDI.CUST.001"},
			{"endpointId"	: "CDI.CUST.004"},
			{"endpointId"	: "CDI.CUST.010"},
			{"endpointId"	: "CDI.CUST.011"}
		]
    },
    {
		"name"			: "Order Management",
		"acronym"		: "OM",
		"description" 	: "NetCracker order management system",
		"vendor"		: "NetCracker",
		"version"		: "",
		"docLink"	    : "http://localhost/architecture/OM",
		"codeLink"		: "https://stash:7443/projects/et-fss",
		"techOwner"		: 
		[
			{
				"name" 	: "Jason Anderson",
				"email"	: "Jason.Anderson@sjrb.ca"
			}
		],
		"technologies"  : ["Java", "Javascript", "T-SQL"],
		"dependsOn"		:
		[
			{"endpointId"	: "AIS.ADDR.001"},
			{"endpointId"	: "AIS.ADDR.013"},
			{"endpointId"	: "AIS.ADDR.014"},
			{"endpointId"	: "AIS.ADDR.018"},
			{"endpointId"	: "AIS.ADDR.015"},
			{"endpointId"	: "AIS.ADDR.016"},
			{"endpointId"	: "AIS.ADDR.010"},
			{"endpointId"	: "AIS.ADDR.017"}
		]
    },
	{
		"name"			: "Product Inventory Management",
		"acronym"		: "PIM",
		"description" 	: "Something about managing products",
		"vendor"		: "Shaw",
		"version"		: "",
		"docLink"	    : "http://localhost/architecture/PIM",
		"codeLink"		: "https://stash:7443/projects/PIM",
		"techOwner"		: 
		[
			{
				"name" 	: "Alex Belegoubets",
				"email"	: "Alax.Belegoubets@sjrb.ca"
			}
		],
		"technologies"  : ["T-SQL"]
    },
	{
		"name"			: "Provisioning Core",
		"acronym"		: "PC",
		"description" 	: "Something about service provisioning?",
		"vendor"		: "Shaw",
		"version"		: "",
		"docLink"	    : "http://localhost/architecture/PC",
		"codeLink"		: "https://svn.oss.prd/repos/SHAW/Services/ProvisioningManagement",
		"techOwner"		: 
		[
			{
				"name" 	: "Jason Liu",
				"email"	: "Jason.Liu@sjrb.ca"
			}
		],
		"technologies"  : [".NET"],
		"dependsOn"		:
		[
			{"endpointId"	: "AIS.ADDR.001"},
			{"endpointId"	: "AIS.ADDR.015"}
		]
    },
	{
		"name"			: "Service Availability",
		"acronym"		: "NSA",
		"description" 	: "Something about service availability",
		"vendor"		: "Shaw",
		"version"		: "",
		"docLink"	    : "http://localhost/architecture/NSA",
		"codeLink"		: "",
		"techOwner"		: 
		[
			{
				"name" 	: "Terry McAllister",
				"email"	: "Terry.McAllister@sjrb.ca"
			},
			{
				"name"	: "Deven Chawla",
				"email" : "Deven.Chawla@sjrb.ca"
			}
		]
    },
	{
		"name"			: "Security Matrix",
		"acronym"		: "SecMtx",
		"description" 	: "",
		"vendor"		: "Shaw",
		"version"		: "",
		"docLink"	    : "http://localhost/architecture/SecMtx",
		"codeLink"		: "",
		"techOwner"		: 
		[
			{
				"name" 	: "Sean Bennett",
				"email"	: "Sean.Bennett@sjrb.ca"
			}
		]
    },
	{
		"name"			: "Trouble Shooting Service",
		"acronym"		: "TSS",
		"description" 	: "",
		"vendor"		: "",
		"version"		: "",
		"docLink"	    : "http://localhost/architecture/TSS",
		"codeLink"		: "https://Stash:7443/projects/CUD",
		"techOwner"		: 
		[
			{
				"name" 	: "Sean Bennett",
				"email"	: "Sean.Bennett@sjrb.ca"
			}
		],
		"technologies"  : [".NET"]
    },
	{
		"name"			: "TV Service Catalog",
		"acronym"		: "TVSC",
		"description" 	: "",
		"vendor"		: "NetCracker",
		"version"		: "",
		"docLink"	    : "http://localhost/architecture/TVSC",
		"codeLink"		: "",
		"techOwner"		: 
		[
			{
				"name" 	: "Jason Anderson",
				"email"	: "Jason.Anderson@sjrb.ca"
			}
		],
		"technologies"  : ["Java"]
    },
	{
		"name"			: "User Desktop",
		"acronym"		: "UDGF",
		"description" 	: "CSR desktop application",
		"vendor"		: "Shaw",
		"version"		: "",
		"docLink"	    : "http://localhost/architecture/UDGF",
		"codeLink"		: "https://Stash:7443/projects/CUD",
		"techOwner"		: 
		[
			{
				"name" 	: "Sean Bennett",
				"email"	: "Sean.Bennett@sjrb.ca"
			}
		],
		"technologies"  : [".NET"],
		"dependsOn"		:
		[
			{"endpointId"	: "AIS.ADDR.001"},
			{"endpointId"	: "AIS.ADDR.006"},
			{"endpointId"	: "AIS.ADDR.007"},
			{"endpointId"	: "AIS.ADDR.002"},
			{"endpointId"	: "AIS.ADDR.008"},
			{"endpointId"	: "AIS.ADDR.009"},
			{"endpointId"	: "AIS.ADDR.010"},
			{"endpointId"	: "AIS.ADDR.011"},
			{"endpointId"	: "CDI.ACC.001"},
			{"endpointId"	: "CDI.ACC.002"},
			{"endpointId"	: "CDI.CUST.001"},
			{"endpointId"	: "CDI.CUST.004"},
			{"endpointId"	: "CDI.CUST.010"},
			{"endpointId"	: "CDI.CUST.011"},
			{"endpointId"	: "CDI.CUST.012"}
		]
    }
  ]
}