/**
 * QuickView Plugin
 * Copyright (c) 2016 Alexandr Bobkov <lilalex85@gmail.com>
 * Dual licensed under MIT and GPL.
 * @author Alexandr Bobkov
 * @version 1.0.0
 */

 /*
******************************************************************
******************************************************************
GLOBAL VARIABLES
******************************************************************
******************************************************************
*/
var applicationPath;
var preloadPageCount;

$(document).ready(function(){
	/*
******************************************************************
PRIVATE VARIABLES
******************************************************************
*/
	var documentGuid;
	var currentDirectory;
	var uploadFilesList = [];
	
	var map = {};
	// add supported formats
	map['folder'] = { 'format': '', 'icon': 'fa-folder' };
	map['pdf'] = { 'format': 'Portable Document Format', 'icon': 'fa-file-pdf-o' };
	map['doc'] = { 'format': 'Microsoft Word', 'icon': 'fa-file-word-o' };
	map['docx'] = { 'format': 'Microsoft Word', 'icon': 'fa-file-word-o' };
	map['docm'] = { 'format': 'Microsoft Word', 'icon': 'fa-file-word-o' };
	map['dot'] = { 'format': 'Microsoft Word', 'icon': 'fa-file-word-o' };
	map['dotx'] = { 'format': 'Microsoft Word', 'icon': 'fa-file-word-o' };
	map['dotm'] = { 'format': 'Microsoft Word', 'icon': 'fa-file-word-o' };
	map['xls'] = { 'format': 'Microsoft Excel', 'icon': 'fa-file-excel-o' };
	map['xlsx'] = { 'format': 'Microsoft Excel', 'icon': 'fa-file-excel-o' };
	map['xlsm'] = { 'format': 'Microsoft Excel', 'icon': 'fa-file-excel-o' };
	map['xlsb'] = { 'format': 'Microsoft Excel', 'icon': 'fa-file-excel-o' };
	map['ppt'] = { 'format': 'Microsoft PowerPoint', 'icon': 'fa-file-powerpoint-o' };
	map['pptx'] = { 'format': 'Microsoft PowerPoint', 'icon': 'fa-file-powerpoint-o' };
	map['pps'] = { 'format': 'Microsoft PowerPoint', 'icon': 'fa-file-powerpoint-o' };
	map['ppsx'] = { 'format': 'Microsoft PowerPoint', 'icon': 'fa-file-powerpoint-o' };
	map['vsd'] = { 'format': 'Microsoft Visio', 'icon': 'fa-file-code-o' };
	map['vdx'] = { 'format': 'Microsoft Visio', 'icon': 'fa-file-code-o' };
	map['vss'] = { 'format': 'Microsoft Visio', 'icon': 'fa-file-code-o' };
	map['vsx'] = { 'format': 'Microsoft Visio', 'icon': 'fa-file-code-o' };
	map['vst'] = { 'format': 'Microsoft Visio', 'icon': 'fa-file-code-o' };
	map['vtx'] = { 'format': 'Microsoft Visio', 'icon': 'fa-file-code-o' };
	map['vsdx'] = { 'format': 'Microsoft Visio', 'icon': 'fa-file-code-o' };
	map['vdw'] = { 'format': 'Microsoft Visio', 'icon': 'fa-file-code-o' };
	map['vstx'] = { 'format': 'Microsoft Visio', 'icon': 'fa-file-code-o' };
	map['vssx'] = { 'format': 'Microsoft Visio', 'icon': 'fa-file-code-o' };
	map['mpp'] = { 'format': 'Microsoft Project', 'icon': 'fa-file-text' };
	map['mpt'] = { 'format': 'Microsoft Project', 'icon': 'fa-file-text' };
	map['msg'] = { 'format': 'Microsoft Outlook', 'icon': 'fa-file-text-o' };
	map['eml'] = { 'format': 'Microsoft Outlook', 'icon': 'fa-file-text-o' };
	map['emlx'] = { 'format': 'Microsoft Outlook', 'icon': 'fa-file-text-o' };
	map['one'] = { 'format': 'Microsoft OneNote', 'icon': 'fa-file-word-o' };
	map['odt'] = { 'format': 'Open Document Text', 'icon': 'fa-file-word-o' };
	map['ott'] = { 'format': 'Open Document Text Template', 'icon': 'fa-file-word-o' };
	map['ods'] = { 'format': 'Open Document Spreadsheet', 'icon': 'fa-file-excel-o' };
	map['odp'] = { 'format': 'Open Document Presentation', 'icon': 'fa-file-powerpoint-o' };
	map['otp'] = { 'format': 'Open Document Presentation', 'icon': 'fa-file-powerpoint-o' };
	map['ots'] = { 'format': 'Open Document Presentation', 'icon': 'fa-file-powerpoint-o' };
	map['rtf'] = { 'format': 'Rich Text Format', 'icon': 'fa-file-text-o' };
	map['txt'] = { 'format': 'Plain Text File', 'icon': 'fa-file-text-o' };
	map['csv'] = { 'format': 'Comma-Separated Values', 'icon': 'fa-file-excel-o' };
	map['html'] = { 'format': 'HyperText Markup Language', 'icon': 'fa-file-word-o' };
	map['mht'] = { 'format': 'HyperText Markup Language', 'icon': 'fa-file-word-o' };
	map['mhtml'] = { 'format': 'HyperText Markup Language', 'icon': 'fa-file-word-o' };
	map['xml'] = { 'format': 'Extensible Markup Language', 'icon': 'fa-file-word-o' };
	map['xps'] = { 'format': 'XML Paper Specification', 'icon': 'fa-file-word-o' };
	map['dxf'] = { 'format': 'AutoCAD Drawing File Format', 'icon': 'fa-file-image-o' };
	map['dwg'] = { 'format': 'AutoCAD Drawing File Format', 'icon': 'fa-file-image-o' };
	map['bmp'] = { 'format': 'Bitmap Picture', 'icon': 'fa-file-image-o' };
	map['gif'] = { 'format': 'Graphics Interchange Format', 'icon': 'fa-file-image-o' };
	map['jpg'] = { 'format': 'Joint Photographic Experts Group', 'icon': 'fa-file-image-o' };
	map['jpe'] = { 'format': 'Joint Photographic Experts Group', 'icon': 'fa-file-image-o' };
	map['jpeg'] = { 'format': 'Joint Photographic Experts Group', 'icon': 'fa-file-image-o' };
	map['jfif'] = { 'format': 'Joint Photographic Experts Group', 'icon': 'fa-file-image-o' };
	map['png'] = { 'format': 'Portable Network Graphics', 'icon': 'fa-file-image-o' };
	map['tiff'] = { 'format': 'Tagged Image File Format', 'icon': 'fa-file-photo-o' };
	map['tif'] = { 'format': 'Tagged Image File Format', 'icon': 'fa-file-photo-o' };
	map['epub'] = { 'format': 'Electronic Publication', 'icon': 'fa-file-pdf-o' };
	map['ico'] = { 'format': 'Windows Icon', 'icon': 'fa-file-image-o' };
	map['webp'] = { 'format': 'Compressed Image', 'icon': 'fa-file-image-o' };
	map['mobi'] = { 'format': 'Mobipocket eBook', 'icon': 'fa-file-pdf-o' };
	map['tex'] = { 'format': 'LaTeX Source Document', 'icon': 'fa-file-pdf-o' };
	map['djvu'] = { 'format': 'Multi-Layer Raster Image', 'icon': 'fa-file-text' };

/*
******************************************************************
NAV BAR CONTROLS
******************************************************************
*/

	//////////////////////////////////////////////////
	// Toggle navigation dropdown menus
	//////////////////////////////////////////////////
	$('.qv-nav-toggle').on('click', function(e){
		if($(this).hasClass('open')){
			$(this).removeClass('open');
		}else{
			$(this).addClass('open');
		}
		var nav_drop = getElementByClass($(this), '.qv-nav-dropdown');
		toggleNavDropdown(nav_drop);
		//set focus to search input
		$('#qv-search-input').focus();
	});

	//////////////////////////////////////////////////
	// Prevent toggle events on search container click
	//////////////////////////////////////////////////
	$('#qv-nav-search-container').on('click', function(e){
		e.stopPropagation();
	});

	//////////////////////////////////////////////////
	// Open modal dialog (file browser) event
	//////////////////////////////////////////////////
	$('#qv-header-logo').on('click', function(e){
		toggleModalDialog(true, 'Open Document');
		loadFileTree('');
	});

	//////////////////////////////////////////////////
	// Close modal dialog event
	//////////////////////////////////////////////////
	$('.qv-modal-close-action').on('click', function(e){
		toggleModalDialog(false, '');
	});

	//////////////////////////////////////////////////
	// File or directory click event from file tree
	//////////////////////////////////////////////////
	$('.qv-modal-table').on('click', '.qv-filetree-name', function(e){
		var isDir = $(this).parent().find('.fa-folder').hasClass('fa-folder');
		if(isDir){
			// if directory -> browse
			if(currentDirectory.length > 0){
				currentDirectory = currentDirectory + "/" + $(this).text();
			}else{
				currentDirectory = $(this).text();
			}
			loadFileTree(currentDirectory);
		}else{
			// if document -> open
			clearPageContents();
			toggleModalDialog(false, '');
			documentGuid = $(this).attr('data-guid');
			loadDocument(function(data){
				// Generate thumbnails
				generatePagesTemplate(data, 'thumbnails-');
			});
		}
	});

	//////////////////////////////////////////////////
	// Go to parent directory event from file tree
	//////////////////////////////////////////////////
	$('.qv-modal-table').on('click', '.qv-filetree-up', function(e){
		if(currentDirectory.length > 0 && currentDirectory.indexOf('/') == -1){
			currentDirectory = '';
		}else{
			currentDirectory = currentDirectory.replace(/\/[^\/]+\/?$/, '');	
		}
		loadFileTree(currentDirectory);
	});

	//////////////////////////////////////////////////
	// Zoom values event
	//////////////////////////////////////////////////
	$('#qv-btn-zoom-value > li').bind('click', function(e){
		var zoomValue = $(this).text();
		switch(zoomValue){
			case 'Fit Width':
				// get page width
				var pageWidth = $('.qv-page').width();
				// get screen width
				var screenWidth = $('#qv-pages').width();
				// get scale ratio
				var scale = (pageWidth / screenWidth) * 100;
				// set values
				zoomValue = 200 - scale;
				break;
			case 'Fit Height': 
				// get page height
				var pageHeight = $('.qv-page').height();
				// get screen height
				var screenHeight = $('#qv-pages').height();
				// get scale ratio
				var scale = (screenHeight / pageHeight) * 100;
				// set values
				zoomValue = scale;
				break;
			default:
				zoomValue = zoomValue.slice(0, -1);
				break;
		}
		setZoomValue(zoomValue);
	});

	//////////////////////////////////////////////////
	// Zoom in event
	//////////////////////////////////////////////////
	$('#qv-btn-zoom-in').on('click', function(e){
		var zoom_val = getZoomValue();
		if(zoom_val < 490){
			zoom_val = zoom_val + 10;
		}
		setZoomValue(zoom_val);
	});

	//////////////////////////////////////////////////
	// Zoom out event
	//////////////////////////////////////////////////
	$('#qv-btn-zoom-out').on('click', function(e){
		var zoom_val = getZoomValue();
		if(zoom_val > 30){
			zoom_val = zoom_val - 10;
		}
		setZoomValue(zoom_val);
	});

	//////////////////////////////////////////////////
	// Page navigation event
	//////////////////////////////////////////////////
	$('.qv-nav-btn-pages').on('click', function(e){
		var pagesAttr = $('#qv-page-num').text().split('/');
		var currentPageNumber = parseInt(pagesAttr[0]);
		var lastPageNumber = parseInt(pagesAttr[1]);
		// get clicked id
		switch($(this).attr('id')){
			case 'qv-btn-page-first':
				currentPageNumber = 1;
			break;
			case 'qv-btn-page-prev':
				currentPageNumber = currentPageNumber - 1;
			break;
			case 'qv-btn-page-next':
				currentPageNumber = currentPageNumber + 1;
			break;
			case 'qv-btn-page-last':
				currentPageNumber = lastPageNumber;
			break;
		}
		// scroll to page
		if(currentPageNumber > 0 && currentPageNumber <= lastPageNumber){
			scrollToPage(currentPageNumber);
		}
	});

	//////////////////////////////////////////////////
	// Page scrolling event
	//////////////////////////////////////////////////
	$('#qv-pages').scroll(function() {
		var pagesAttr = $('#qv-page-num').text().split('/');
		// get current page number
		var currentPageNumber = parseInt(pagesAttr[0]);
		// get last page number
    	var lastPageNumber = parseInt(pagesAttr[1]);
    	// get zoom value
		var zoomValue = getZoomValue()/100;
		// get scroll position
	    var scrollPosition = $(this).scrollTop();
	    // get current page height
	    var pageHeight = $('#qv-page-' + currentPageNumber).height() + 20 /* plus margin */;
	    // get scroll relative position to current page
	    var pagePosition = parseInt(Math.floor(scrollPosition / pageHeight / zoomValue)) + 1;
	    // update values and perform page lazy load
	    if((pagePosition > 0) && (pagePosition <= lastPageNumber)){
		    // change current page value
		    if(pagePosition != currentPageNumber){
				// set current page number
				setNavigationPageValues(pagePosition, lastPageNumber);
			}
			// load next page
			if((pagePosition == currentPageNumber) && (pagePosition != lastPageNumber)){
		  		appendHtmlContent(currentPageNumber + 1);
			}
		}
	});

	//////////////////////////////////////////////////
	// Clear search input
	//////////////////////////////////////////////////
	$('#qv-nav-search-cancel').on('click', function(e){
		clearSearch();
	});

	//////////////////////////////////////////////////
	// Read search input value on input change event
	//////////////////////////////////////////////////
	$('#qv-search-input').on('input', function(e){
		highlightSearch($(this).val());
	});

	//////////////////////////////////////////////////
	// Search next event
	//////////////////////////////////////////////////
	var search_position = 0;
	$('#qv-nav-search-next').on('click', function(e){
		var count = 0;
		// remove/clear previously selected highlights
		$('#qv-pages').find('.qv-highlight-select').removeClass('qv-highlight-select');
		// search for matched elements
		$('.qv-highlight').each(function(e){
			if(count == search_position){
				console.log(this);
				// add selected highlight
				$(this).addClass('qv-highlight-select');
				// scroll to next page
				$('#qv-pages').scrollTo(this, {
					offsetTop: 150
				});
				// check if this is last rearch result instance
				if(search_position >= getTotalSearchMatches()){
					// deactivate next button
				}else{
					// increment search position
					search_position++;	
				}
				// end each loop
				return false;
			}
			count++;
		});
		setSearchMatchCount(search_position, getTotalSearchMatches());
	});

	//////////////////////////////////////////////////
	// Search prev event
	//////////////////////////////////////////////////
	$('#qv-nav-search-prev').on('click', function(e){
		var count = 1;
		var prev;
		// remove/clear previously selected highlights
		$('#qv-pages').find('.qv-highlight-select').removeClass('qv-highlight-select');
		// search for matched elements
		$('.qv-highlight').each(function(e){
			if((count == (search_position)) && (prev != undefined)){
				// add selected highlight
				$(prev).addClass('qv-highlight-select');
				// scroll to previous page
				$('#qv-pages').scrollTo(prev, {
					offsetTop: 150
				});
				// check if this is first search result instance
				if(search_position <= 1){
					// deactivate prev button
				}else{
					// decrement search position
					search_position--;
				}
				// end each loop
				return false;
			}
			count++;
			// store last instance
			prev = $(this);
		});
		setSearchMatchCount(search_position, getTotalSearchMatches());
	});
	
	//////////////////////////////////////////////////
	// Open/Close thumbnails event
	//////////////////////////////////////////////////
	$('#qv-nav-right').on('click', function(){
	    // open/close sidebar
        $('#qv-thumbnails').toggleClass('active');
        if($("#qv-pages").css("margin-left") == "0px"){
	        $("#qv-pages").css("margin-left", "280px");
        } else {
	        $("#qv-pages").css("margin-left", "0px");
        }
    });
	
	//////////////////////////////////////////////////
	// Thumbnail click event
	//////////////////////////////////////////////////
	$('#qv-thumbnails-panzoom').on('click', '.qv-page',function(){
	    // get clicked thumbnail page number
		var page = $(this).attr('id').split('-')[3];
		scrollToPage(page);
	});

	//////////////////////////////////////////////////
	// Rotate counterclockwise event
	//////////////////////////////////////////////////
	$('#qv-btn-counterclockwise').on('click', function(e){
		rotatePages("-90");
	});
	
	//////////////////////////////////////////////////
	// Rotate clockwise event
	//////////////////////////////////////////////////
	$('#qv-btn-clockwise').on('click', function(e){
		rotatePages("90");
	});
	
	//////////////////////////////////////////////////
	// Download event
	//////////////////////////////////////////////////
	$('#qv-btn-download').on('click', function(e){
		downloadDocument();
	});
	
	//////////////////////////////////////////////////
	// Drag n Drop
	//////////////////////////////////////////////////
	var dropZone = $('#qv-dropZone');
        if (typeof dropZone[0] != "undefined") {
            //Drag n drop functional
            if ($('#qv-dropZone').length) {
                if (typeof (window.FileReader) == 'undefined') {
                    dropZone.text("Your browser doesn't support Drag and Drop");
                    dropZone.addClass('error');
                }
            }
    
            dropZone[0].ondragover = function () {
                dropZone.addClass('hover');
                return false;
            };
    
            dropZone[0].ondragleave = function () {
                dropZone.removeClass('hover');
                return false;
            };
    
            dropZone[0].ondrop = function (event) {
                event.preventDefault();
                dropZone.removeClass('hover');
                var files = event.dataTransfer.files;
                addFileForUpload(files);
            };
        }
	
	//////////////////////////////////////////////////
	// Select files for upload event
	//////////////////////////////////////////////////
	$('#qv-upload-input').on('change', function(e){
	    // get selected files
	    var input = $(this);
       	    // add files to the table		
	    addFileForUpload(input.get(0).files);
	});
	
	//////////////////////////////////////////////////
	// Cancel file upload event
	//////////////////////////////////////////////////
	 $('#qv-upload-files-table').on('click', ".qv-cancel-button", function(e){
            // get selected files
            var button = $(this);
            // get file name which will be deleted
            var fileName = button.closest("tr").find("div")[0].innerHTML;
            // find its index in the array
            for(var i = 0; i < uploadFilesList.length; i++){
              if(uploadFilesList[i].name == fileName){
                  // remove file from the files array
                  uploadFilesList.splice(i, 1);
              }
            }
            // remove table row
       	    button.closest("tr").remove();
	    $('#qv-upload-input').val('');
	    // recalculate indexes in the files table
	    var tableRows = $('#qv-upload-files-table > tbody > tr');
	    for(var n = 0; n < tableRows.length; n++){
		$(tableRows[n]).find("div.progress-bar").attr("id", "qv-pregress-bar-" + n);
	    }
	    // if table is empty disable upload button
	    if(tableRows.length == 0){
		$("#qv-upload-button").prop("disabled", true);
	    }
	});
	
	//////////////////////////////////////////////////
	// Upload event
	//////////////////////////////////////////////////
	$("#qv-upload-button").on('click', function(e){
            // get current number of table rows
            var tableRows = $('#qv-upload-files-table > tbody > tr');
            // initiate URL counter required for proper calculating of the uploaded files in case local files uploaded with URLs
            var urlCounter = 0;
            // upload file one by one
            for (var i = 0; i < tableRows.length; i++) {
	        // check if current table row contains URL instead of file
	        if($(tableRows[i]).find("td[data-value]").length > 0) {
		    // upload URL
		    uploadDocument(null, i, $(tableRows[i]).find("td.qv-filetree-name").data().value);
		    // increase URL counter
		    urlCounter++;
	        } else {
		    // upload local file
		    uploadDocument(uploadFilesList[i - urlCounter], i);
	        }
            }
	});
	
	//////////////////////////////////////////////////
	// Open URL input event
	//////////////////////////////////////////////////
	$('#qv-url-button').on('click', function () {
            $('#qv-url-wrap').slideDown('fast');
        });
	
	//////////////////////////////////////////////////
	// Close URL input event
	//////////////////////////////////////////////////
	$('#qv-url-cancel').on('click', function () {
            $('#qv-url-wrap').slideUp('fast');
            $('#qv-url').val('');
        });
	
	//////////////////////////////////////////////////
	// Add file via URL event
	//////////////////////////////////////////////////
	$('#qv-add-url').on('click', function () {
            addFileForUpload(null, $("#qv-url").val());
        });

/*
******************************************************************
FUNCTIONS
******************************************************************
*/
	
	/**
	* Load file tree
	* @param {string} dir - files location directory
	*/
	function loadFileTree(dir) {
	    var data = {path: dir};
	    currentDirectory = dir;
	    // show loading spinner
	    $('#qv-modal-spinner').show();
	    // get data
	    $.ajax({
	        type: 'POST',
	        url: getApplicationPath('loadFileTree'),
	        data: JSON.stringify(data),
	        contentType: "application/json",
	        success: function(returnedData) {
	        	if(returnedData.error != undefined){
	        		// open error popup
	        		printMessage(returnedData.error);
	        		return;
	        	}
	        	// hide loading spinner
	        	$('#qv-modal-spinner').hide();
	        	// clear tree list from previous data
	        	$('#qv-modal-filebroswer tbody').html(
        			'<tr>'+
						'<td class="text-center"><i class="fa fa-level-up"></i></td>'+
						'<td class="qv-filetree-up">...</td>'+
						'<td></td>'+
						'<td></td>'+
	                '</tr>');
	        	// show tree list wrapper
	        	$('#qv-modal-filebroswer').show();
	        	// append files to tree list
	            $.each(returnedData, function(index, elem){
	            	// document name
	                var name = elem.name;
	                // document guid
	                var guid = elem.guid;
	                // document size
	                var size = elem.size;
	                // convert to proper size
	                var new_size = size + ' Bytes';
	                if((size / 1024 / 1024) > 1){
	                	new_size = (Math.round((size / 1024 / 1024) * 100) / 100) + ' MB';
	                }else if((size / 1024) > 1){
	                	new_size = (Math.round((size / 1024) * 100) / 100) + ' KB';
	                }
	                // document format
	                var docFormat = (getDocumentFormat(name) == undefined)? 'fa-folder' : getDocumentFormat(name);
	                // append document
	                $('.qv-modal-table tbody').append(
	                    '<tr>'+
			        '<td><i class="fa ' + docFormat.icon + '"></i></td>'+
			        '<td class="qv-filetree-name" data-guid="' + guid + '"><div class="qv-file-name">' + name + '</div></td>'+
			        '<td>' + docFormat.format + '</td>'+
			        '<td>' + new_size + '</td>'+
	                    '</tr>');
	            });
	        },
	        error: function(xhr, status, error) {
	          var err = eval("(" + xhr.responseText + ")");
	          console.log(err.Message);
	        }
	    });
	}

	/**
	* Open/Load document
	* @param {object} callback - document pages array
	*/
	function loadDocument(callback){
		// get document description
		var data = {guid: documentGuid};
	    $.ajax({
	        type: 'POST',
	        url: getApplicationPath('loadDocumentDescription'),
	        data: JSON.stringify(data),
	        contentType: "application/json",
	        success: function(returnedData) {
	        	if(returnedData.error != undefined){
	        		// open error popup
	        		printMessage(returnedData.error);
	        		return;
	        	}
	        	// get total page number
	        	var totalPageNumber = returnedData.length;
	        	// set total page number on navigation panel
	        	setNavigationPageValues('1', totalPageNumber);
	        	// render pages
	        	generatePagesTemplate(returnedData);
	        },
	        error: function(xhr, status, error) {
	          var err = eval("(" + xhr.responseText + ")");
	          console.log(err.Message);
	        }
	    }).done(function(data){
	    	// return POST data
	    	callback(data);
	    });
	}

	/**
	* Generate empty pages temples before the actual get pages request
	* @param {object} data - document pages array
	* @param {string} prefix - elements id prefix
	*/
	function generatePagesTemplate(data, prefix){
		// set empty for undefined of null
		prefix = prefix || '';
		// loop though pages
		$.each(data, function(index, elem){
    		// set document description
    		var pageNumber = elem.number;
    		var pageWidth = elem.width;
    		var pageHeight = elem.height;
    		// append empty page
    		$('#qv-' + prefix + 'panzoom').append(
    			'<div id="qv-' + prefix + 'page-' + pageNumber + '" class="qv-page" style="min-width: ' + pageWidth + '; min-height: ' + pageHeight + ';">'+
				'<div class="qv-page-spinner"><i class="fa fa-circle-o-notch fa-spin"></i> &nbsp;Loading... Please wait.</div>'+
				'</div>'
				);
    		// check if preload page count is set
    		if((preloadPageCount == 0) || (index <= (preloadPageCount - 1))){
    			appendHtmlContent(pageNumber, documentGuid, prefix);
    		}
    	});
	}

	/**
	* Append html content to an empty page
	* @param {int} pageNumber - page number
	* @param {string} documentName - document name/id
	* @param {string} prefix - elements id prefix
	*/
	function appendHtmlContent(pageNumber, documentName, prefix){
		// set empty for undefined of null
		prefix = prefix || '';
		// initialize data
		var qv_prefix_page = $('#qv-' + prefix + 'page-' + pageNumber);
		var qv_page = $('#qv-page-' + pageNumber);

		if(!qv_prefix_page.hasClass('loaded')){
			qv_prefix_page.addClass('loaded');
			// get document description
			var data = {guid: documentGuid, page: pageNumber};
		    $.ajax({
		        type: 'POST',
		        url: getApplicationPath('loadDocumentPage'),
		        data: JSON.stringify(data),
		        contentType: "application/json",
		        success: function(htmlData) {
		        	if(htmlData.error != undefined){
		        		// open error popup
		        		printMessage(htmlData.error);
		        		return;
		        	}
		        	// apend page content
					qv_prefix_page.append('<div class="qv-wrapper">' + htmlData + '</div>');
					qv_prefix_page.find('.qv-page-spinner').hide();
					// fix zoom in/out scaling
		        	var zoomValue = 1;
		        	// check if page is horizontaly displayed
		        	if(qv_page.innerWidth() > qv_page.innerHeight()){
		        		zoomValue = 0.79;
		        	}
		        	qv_prefix_page.css('width', qv_page.innerWidth());
		        	qv_prefix_page.css('height', qv_page.innerHeight());
		        	qv_prefix_page.css('zoom', zoomValue);
					if(documentName.substr((documentName.lastIndexOf('.') +1)) == "one"){
						$(".qv-wrapper").css("width", "initial");
					}
		        },
		        error: function(xhr, status, error) {
		          var err = eval("(" + xhr.responseText + ")");
		          console.log(err.Message);
		        }
		    });
		}
	}

	/**
	* Get document format (type)
	* @param {string} filename - document name
	*/
	function getDocumentFormat(filename){
	    if(typeof map[filename.split('.').pop().toLowerCase()] == "undefined"){
		return map["folder"];
	    } else {
		return map[filename.split('.').pop().toLowerCase()];
	    }
	}

	/**
	* Get application path for GET/POST requests
	* @param {string} context - application context
	*/
	function getApplicationPath(context){
		if(applicationPath != null){
			if(applicationPath.slice(-1) == '/'){
				return applicationPath + context;
			}else{
				return applicationPath + "/" + context;
			}
		}else{
			return context;
		}
	}

	/**
	* Search for element by class (recursive)
	* @param {object} target - object where to search for an id
	* @param {string} class_id - class id
	*/
	function getElementByClass(target, class_id){
		var elem = target.find(class_id);
		if(!elem.hasClass(class_id.slice(1))){
			return getElementByClass(target.parent(), class_id);
		}else{
			return elem;
		}
	}

	/**
	* Toggle modal dialog
	* @param {boolean} open - open/close value
	* @param {string} title - title to display in modual dialog (popup)
	*/
	function toggleModalDialog(open, title){
		if(open){
			$('#modalDialog .qv-modal-title').text(title);
			$('#modalDialog')
				.css('opacity', 0)
				.fadeIn('fast')
				.animate(
					{ opacity: 1 },
					{ queue: false, duration: 'fast' }
				);
			$('#modalDialog').addClass('in');
		}else{
			$('#modalDialog').removeClass('in');
			$('#modalDialog')
				.css('opacity', 1)
				.fadeIn('fast')
				.animate(
					{ opacity: 0 },
					{ queue: false, duration: 'fast' }
				)
				.css('display', 'none');
			// hide all contents
			$('#qv-modal-filebroswer').hide();
			$('#qv-modal-spinner').hide();
			$('#qv-modal-error').hide();
		}
	}

	/**
	* Toggle top navigation menus (zoom, search)
	* @param {object} target - dropdown target to be opened/closed
	*/
	function toggleNavDropdown(target){
		var isOpened = target.hasClass('opened');
		if(!isOpened){
			$(target).addClass('opened');
			$(target)
				.css('opacity', 0)
				.slideDown('fast')
				.animate(
					{ opacity: 1 },
					{ queue: false, duration: 'fast' }
				);
		}else{
			$(target).removeClass('opened');
			$(target)
				.css('opacity', 1)
				.slideUp('fast')
				.animate(
					{ opacity: 0 },
					{ queue: false, duration: 'fast' }
				);
		}
	}

	/**
	* Highlight search results
	* @param {string} text - text to search
	*/
	function highlightSearch(text) {
		clearHighlightSearch();
		if(text.length > 1){
			var textNodes = $('#qv-pages .qv-wrapper div').find('*').contents().filter(function() { 
				return this.nodeType === 3;
			});
			textNodes.each(function() {
				var $this = $(this);
				var content = $this.text();
				// ignor upper/lower cases
				var regEx = new RegExp(text, "ig");
				// find mattching string
				var str_start = content.search(regEx);
				var originalString = 'did not worked!';
				if(str_start >= 0){
					var originalString = content.substring(str_start, str_start + text.length);
				}
				// add highlight
				content = content.replace(regEx, '<span class="qv-highlight">' + originalString + '</span>');
				// update to new content
				$this.replaceWith(content);
			});
			var totalSearchMatches = getTotalSearchMatches();
			setSearchMatchCount(0, totalSearchMatches);
			if(totalSearchMatches > 0){
				$('#qv-nav-search-next').click();
			}
  		}
	}

	/**
	* Zoom document
	* @param {int} zoom_val - zoom value from 0 to 100
	*/
	function setZoomValue(zoom_val){
		// adapt value for css
		var zoom_val_non_webkit = zoom_val / 100;
		var zoom_val_webkit = Math.round(zoom_val) + '%';
		// display zoom value
		setNavigationZoomValues(zoom_val_webkit);
		// set css zoom values
		var style = [
			'zoom: ' + zoom_val_webkit,
			'zoom: ' + zoom_val_non_webkit, // for non webkit browsers
			'-moz-transform: (' + zoom_val_non_webkit + ', ' + zoom_val_non_webkit + ')' // for mozilla browser
		].join(';');
		// add style
		$('#qv-panzoom').attr('style', style);
	}

	/**
	* Get currently set zoom value
	*/
	function getZoomValue(){
		return parseInt($('#qv-zoom-value').text().slice(0, -1));
	}

	/**
	* Get total matches count from search
	*/
	function getTotalSearchMatches(){
		return $('.qv-highlight').length;
	}

	/**
	* Set number of currently selected match
	* @param {int} index - current searched result position
	* @param {int} totalCound - total search matches
	*/
	function setSearchMatchCount(index, totalCount){
		$('#qv-search-count').text(index + " of " + totalCount);
	}

	/**
	* Set zoom values on navigation panel
	* @param {int} value - zoom value from 0 to 100
	*/
	function setNavigationZoomValues(value){
		$('#qv-zoom-value').text(value);
	}

	/**
	* Set page values on navigation panel
	* @param {int} firstPageNumber - first page number
	* @param {int} lastPageNumber - last page number or total pages
	*/
	function setNavigationPageValues(firstPageNumber, lastPageNumber){
		$('#qv-page-num').text(firstPageNumber + '/' + lastPageNumber);
	}

	/**
	* Clear search input
	*/
	function clearSearch(){
		$('#qv-nav-search-container :input').val('');
		setSearchMatchCount(0, 0);
		clearHighlightSearch();
	}

	/**
	* Clear previously highlighted search
	*/
	function clearHighlightSearch(){
	    //remove highlights
	    $('#qv-pages .qv-highlight').contents().unwrap();
	    // normalize text
	    $('#qv-pages').each(function(index, element){
	    	element.normalize();
	    });
	    search_position = 0;
	}

	/**
	* Clear all data from peviously loaded document
	*/
	function clearPageContents(){
		// set zoom to default
		setZoomValue(100);
		// set page number and total pages to zero
		setNavigationPageValues('0', '0');
		// remove previously rendered document pages
		$('#qv-panzoom').html('');
		$('#qv-thumbnails-panzoom').html('');
		// go to top
		$('#qv-pages').scrollTo(0, {
			duration: 0
		});
	}

	/**
	* Clear all data from peviously loaded document
	* @param {string} message - message to diplay in popup
	*/
	function printMessage(message){
		$('#qv-modal-error').show();
		$('#qv-modal-error').text(message);
		toggleModalDialog(true, 'Error');
	}

	/**
	* Scroll to page
	* @param {int} pageNumber - page number where to scroll
	*/
	function scrollToPage(pageNumber){
		// get zoom value
		var zoomValue = $('#qv-panzoom').css('zoom');
		if(zoomValue == 'undefined'){
			zoomValue = 100;
		}else{
			zoomValue = zoomValue * 100;
		}
		// scroll
		$('#qv-pages').scrollTo('#qv-page-' + pageNumber, {
			zoom: zoomValue
		});
	}

	/**
	* Rotate document pages
	* @param {int} angle - document page rotation angle
	*/
	function rotatePages(angle){
        // Get current page number
	    var pagesAttr = $('#qv-page-num').text().split('/');
	    var currentPageNumber = parseInt(pagesAttr[0]);
        // Prepare pages numbers array
	    var pages = [];
	    pages[0] = currentPageNumber;
	    // Prepare ajax data
	    var data = {guid: documentGuid, angle: angle, pages: pages};
	    $.ajax({
	        type: 'POST',
	        url: getApplicationPath('rotateDocumentPages'),
	        data: JSON.stringify(data),
	        contentType: "application/json",
	        success: function(returnedData) {
			    if(returnedData.error != undefined){
					// open error popup
					printMessage(returnedData.error);
					return;
		    	}
			    $.each(returnedData, function(index, elem){
			        // Rotate the page
			        $('#qv-page-' + elem.pageNumber).css('transform', 'rotate(' + elem.angle + 'deg)');
			    });
			},
	        error: function(xhr, status, error) {
	          var err = eval("(" + xhr.responseText + ")");
	          console.log(err.Message);
	        }
	    });
	}
	
	/**
	* Download current document
	*/
	function downloadDocument(){
		if(documentGuid != "" && typeof documentGuid != "undefined"){
		    // Open download dialog
		    window.location.assign(getApplicationPath('downloadDocument/?path=') + documentGuid);
		} else {
		    // open error popup
		    printMessage("Please open document first");
	    }
	}
	
	/**
	* Add file to the upload list
	* @param {file[]} uploadFiles - Files array for uploading
	* @param {string} url - URL of the file
	*/
	function addFileForUpload(uploadFiles, url) {
	    // get table in which files will be added
	    var table = $("#qv-upload-files-table");
	    // get current count of table rows
	    var tableRowsNumber = $('#qv-upload-files-table > tbody > tr').length;
	    if(url){
	        // append URL
	        table.append(
		    '<tr>'+
			'<td><i class="fa ' + getDocumentFormat(url.split('/').pop()).icon + '"></i></td>'+
			'<td class="qv-filetree-name" data-value="' + url + '"><div class="qv-file-name">' + url.split('/').pop() + '</div>'+ 
			    '<span id="qv-upload-size"> type: ' + url.split('/').pop().split('.').pop() +'</span>'+
			'</td>'+
			'<td>'+
			    '<div class="progress qv-progress">'+
			        '<div id="qv-pregress-bar-' + tableRowsNumber + '" class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">'+
			        '</div>'+
			    '</div>'+
			'</td>'+
			'<td class="files-table-remove">'+
			    '<button class="btn qv-cancel-button"><i class="fa fa-trash-o"></i></button>'+
			'</td>'+
		    '</tr>');
	        // increase table rows counter after adding new record
	        tableRowsNumber++			
	    } else {
	        // append files
	        $.each(uploadFiles, function(index, file){
		    uploadFilesList.push(file);
		    // document format
		    var docFormat = getDocumentFormat(file.name);
		    // convert to proper size
		    var new_size = file.size + ' Bytes';
		    if((file.size / 1024 / 1024) > 1){
			new_size = (Math.round((file.size / 1024 / 1024) * 100) / 100) + ' MB';
		    }else if((file.size / 1024) > 1){
			new_size = (Math.round((file.size / 1024) * 100) / 100) + ' KB';
		    }
		    // append document
		    table.append(
			'<tr>'+
			    '<td><i class="fa ' + docFormat.icon + '"></i></td>'+
			    '<td class="qv-filetree-name"><div class="qv-file-name">' + file.name + '</div>'+ 
				'<span id="qv-upload-size">size: ' + new_size +'</span>'+
				'<span id="qv-upload-size"> type: ' + file.name.split('.').pop() +'</span>'+
			    '</td>'+
			    '<td>'+
				'<div class="progress qv-progress">'+
				    '<div id="qv-pregress-bar-' + tableRowsNumber + '" class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">'+
				    '</div>'+
				'</div>'+
			    '</td>'+
			    '<td class="files-table-remove">'+
				    '<button class="btn qv-cancel-button"><i class="fa fa-trash-o"></i></button>'+
			    '</td>'+
			'</tr>');
		    // increase table rows counter after adding new record
		    tableRowsNumber++	
	        });
	    }		
	    $("#qv-upload-button").prop("disabled", false);
	}
	
	/**
	* Upload document
	* @param {file} file - File for uploading
	* @param {int} index - Number of the file to upload
	* @param {string} url - URL of the file, set it if URL used instead of file
	*/
	function uploadDocument(file, index, url = ''){
	    // prepare form data for uploading
	    var formData = new FormData();    
	    // add local file for uploading
	    formData.append("file", file);
	    // add URL if set
	    formData.append("url", url);
	    $.ajax({
	        // callback function which updates upload progress bar
	        xhr: function()
	        {
	            var xhr = new window.XMLHttpRequest();
	            // upload progress
	            xhr.upload.addEventListener("progress", function(event){
		        if (event.lengthComputable) {
		            // increase progress
		            $("#qv-pregress-bar-" + index).css("width",  event.loaded / event.total * 100+"%");
		        }
	            }, false);
	            return xhr;
	        },
	        type: 'POST',
	        url: getApplicationPath('uploadDocument'), 
	        data: formData,   
	        cache: false,
	        contentType: false,
	        processData: false,			                      
	        success: function(returnedData) {
	            if(returnedData.error != undefined){
		        // open error popup
		        printMessage(returnedData.error);
		        return;
	            }
	            // update files tree
	            loadFileTree('');
	        },
	        error: function(xhr, status, error) {
	          var err = eval("(" + xhr.responseText + ")");
	          console.log(err.Message);
	        }
	    });		
	}
//
// END of document ready function
});

/*
******************************************************************
******************************************************************
QUICKVIEW PLUGIN
******************************************************************
******************************************************************
*/
(function( $ ) {
/*
******************************************************************
STATIC VALUES
******************************************************************
*/
	var qv_navbar = '#qv-navbar';

/*
******************************************************************
METHODS
******************************************************************
*/
	var methods = {
		init : function( options ) {
			// set defaults
			var defaults = {
				applicationPath: null,
				preloadPageCount: 1,
				zoom : true,
				pageSelector: true,
				search: true,
				thumbnails: true,
				rotate: true,
				download: true
			};
			options = $.extend(defaults, options);

			// set global option params
			applicationPath = options.applicationPath;
			preloadPageCount = options.preloadPageCount;

			// assembly html base
			this.append(getHtmlBase);
			this.append(getHtmlModalDialog);

			// assembly nav bar
			if(options.zoom){
				$(qv_navbar).append(getHtmlNavZoomPanel);
				$(qv_navbar).append(getHtmlNavSplitter);
			}
			if(options.pageSelector){
				$(qv_navbar).append(getHtmlNavPagesPanel);
				$(qv_navbar).append(getHtmlNavSplitter);
			}
			if(options.rotate){
				$(qv_navbar).append(getHtmlRotatePanel);
				$(qv_navbar).append(getHtmlNavSplitter);
			}
			if(options.search){
				$(qv_navbar).append(getHtmlNavSearchPanel);
				$(qv_navbar).append(getHtmlNavSplitter);
			}
			if(options.download){
				$(qv_navbar).append(getHtmlNavDownloadPanel);
				$(qv_navbar).append(getHtmlNavSplitter);
			}
			if(options.thumbnails){
				$(qv_navbar).append(getHtmlNavThumbTogglePanel);
			}
		}

	};
	

/*
******************************************************************
INIT PLUGIN
******************************************************************
*/
	$.fn.quickView = function( method ) {
		if ( methods[method] ) {
      		return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
    	} else if ( typeof method === 'object' || ! method ) {
      		return methods.init.apply( this, arguments );
    	} else {
      		$.error( 'Method' +  method + ' does not exist on jQuery.quickView' );
    	} 	
	};


/*
******************************************************************
HTML MARKUP
******************************************************************
*/
	function getHtmlBase(){
		return '<div id="qv-container">'+
			    '<div class="wrapper">'+
			        // header BEGIN
			        '<div id="qv-header">'+
						'<div id="qv-header-logo"></div>'+
						// nav bar BEGIN
						'<ul id="' + qv_navbar.slice(1) + '">'+
							// nav bar content	
						'</ul>'+
						// nav bar END
			        '</div>'+
			        // header END
    
			        // thumbnails sidebar BEGIN
			        '<div id="qv-thumbnails">'+
						'<div id="qv-thumbnails-panzoom">'+
							// Thumbnails will be added here automatically on document open
						'</div>'+
			        '</div>'+
			        // thumbnails sidebar END
			        
			        // pages BEGIN
			        '<div id="qv-pages">'+
						'<div id="qv-panzoom">'+
							// list of pages
						'</div>'+
			        '</div>'+
			        // pages END
								        
			    '</div>'+
			'</div>';
	}

	function getHtmlModalDialog(){
		return 	'<div class="qv-modal fade" id="modalDialog">'+
			      '<div class="qv-modal-dialog">'+
			        '<div class="qv-modal-content">'+
			            // header
			            '<div class="qv-modal-header">'+
							'<div class="qv-modal-close qv-modal-close-action"><span>x</span></div>'+
							'<h4 class="qv-modal-title">Open Document</h4>'+						
			            '</div>'+
			            // body
			            '<div class="qv-modal-body">'+
				        '<div class="tabs">'+
					    '<input id="qv-tab1" type="radio" name="tabs" checked>'+
					    '<label for="qv-tab1"><i class="fa fa-list-alt"></i>Select</label>'+
					    '<input id="qv-tab2" type="radio" name="tabs">'+
					    '<label for="qv-tab2"><i class="fa fa-cloud-upload"></i>Upload</label>'+
					    '<section id="qv-select-tab" class="tab-slider-body">'+
					        '<div id="qv-modal-spinner"><i class="fa fa-circle-o-notch fa-spin"></i> &nbsp;Loading... Please wait.</div>'+
					        '<div id="qv-modal-error">TEST</div>'+
					        '<table id="qv-modal-filebroswer" class="qv-modal-table">'+
					        '<thead>'+
						    '<tr>'+
							'<th class="col-md-1"> </th>'+
							'<th class="col-md-5">Document</th>'+
							'<th class="col-md-3">Format</th>'+
							'<th class="col-md-3">Size</th>'+
						    '</tr>'+
					        '</thead>'+
					        '<tbody>'+
					        // list of files
					        '</tbody>'+
					        '</table>'+
					    '</section>'+				    
					    '<section id="qv-upload-tab" class="tab-slider-body">'+
					       '<div class="qv-drag-n-drop-wrap" id="qv-dropZone">'+
						    '<div class="qv-drag-n-drop-icon"><i class="fa fa-cloud-download fa-5x" aria-hidden="true"></i></div>'+
						    '<h2>Drag &amp; Drop your files here</h2>'+
						    '<h4>OR</h4>'+
					        '</div>'+
						'<div class="qv-drag-n-drop-buttons">'+
						    '<label class="btn btn-primary">'+
							'<i class="fa fa-file"></i>'+
							'SELECT FILE <input id="qv-upload-input" type="file" multiple style="display: none;">'+
						    '</label>'+
						    '<button class="btn btn-warning" id="qv-url-button"><i class="fa fa-link"></i>URL</button>'+
						'</div>'+
						'<div class="inner-addon left-addon btn qv-url-wrap" id="qv-url-wrap" style="display: none;">'+
						    '<input type="url" class="form-control" id="qv-url" placeholder="Enter your file URL">'+
						    '<button class="btn" id="qv-url-cancel"><i class="fa fa-trash-o"></i></button>'+
						    '<button class="btn btn-primary" id="qv-add-url">Add</button>'+
						'</div>'+
						'<table id="qv-upload-files-table" class="table table-striped">'+
						    '<tbody>'+
						    // list of files
						    '</tbody>'+
						'</table>'+
						'<button id="qv-upload-button" type="button" class="btn btn-success" disabled>Upload</button>'+
					    '</section>'+
				        '</div>'+
			            '</div>'+						
			            // footer
			            '<div class="qv-modal-footer">'+
			            // empty footer
			            '</div>'+
			        '</div><!-- /.modal-content -->'+
			      '</div><!-- /.modal-dialog -->'+
			    '</div>';
	}

	function getHtmlNavSplitter(){
		return '<li class="qv-nav-separator" role="separator"></li>';
	}

	function getHtmlNavZoomPanel(){
		return '<li class="qv-nav-toggle" id="qv-zoom-val-container">'+
					'<span id="qv-zoom-value">100%</span>'+
					'<span class="qv-nav-caret"></span>'+
					'<ul class="qv-nav-dropdown-menu qv-nav-dropdown" id="qv-btn-zoom-value">'+
						'<li>25%</li>'+
						'<li>50%</li>'+
						'<li>100%</li>'+
						'<li>150%</li>'+
						'<li>200%</li>'+
						'<li>300%</li>'+
						'<li role="separator" class="qv-nav-dropdown-menu-separator"></li>'+
						'<li>Fit Width</li>'+
						'<li>Fit Height</li>'+
		            '</ul>'+
				'</li>'+
				'<li id="qv-btn-zoom-in">'+
					'<i class="fa fa-search-plus"></i>'+
				'</li>'+
				'<li id="qv-btn-zoom-out">'+
					'<i class="fa fa-search-minus"></i>'+
				'</li>';
	}

	function getHtmlNavPagesPanel(){
		return '<li id="qv-btn-page-first" class="qv-nav-btn-pages">'+
					'<i class="fa fa-angle-double-left"></i>'+
				'</li>'+
				'<li id="qv-btn-page-prev" class="qv-nav-btn-pages">'+
					'<i class="fa fa-angle-left"></i>'+
				'</li>'+
				'<li id="qv-page-num">0/0</li>'+
				'<li id="qv-btn-page-next" class="qv-nav-btn-pages">'+
					'<i class="fa fa-angle-right"></i>'+
				'</li>'+
				'<li id="qv-btn-page-last" class="qv-nav-btn-pages">'+
					'<i class="fa fa-angle-double-right"></i>'+
				'</li>';
	}

	function getHtmlNavSearchPanel(){
		return '<li class="qv-nav-toggle">'+
					'<i class="fa fa-search"></i>'+
					'<div id="qv-nav-search-container" class="qv-nav-dropdown">'+
						'<input type="text" id="qv-search-input"/>'+
						'<div id="qv-search-count">0 of 0</div>'+
						'<div class="qv-nav-search-btn" id="qv-nav-search-prev"><i class="fa fa-chevron-left"></i></div>'+
						'<div class="qv-nav-search-btn" id="qv-nav-search-next"><i class="fa fa-chevron-right"></i></div>'+
						'<div class="qv-nav-search-btn" id="qv-nav-search-cancel"><i class="fa fa-times"></i></div>'+
					'</div>'+
				'</li>';
	}

	function getHtmlNavThumbTogglePanel(){
		return '<li id="qv-nav-right"><i class="fa fa-th-large"></i></li>';
	}

	function getHtmlRotatePanel(){
		return '<li id="qv-btn-counterclockwise"><i class="fa fa-rotate-left"></i></li>'+
		       '<li id="qv-btn-clockwise"><i class="fa fa-rotate-right"></i></li>';
	}
	
	function getHtmlNavDownloadPanel(){
		return '<li id="qv-btn-download"><i class="fa fa-cloud-download"></i></li>';
	}	
	
})(jQuery);

/*
******************************************************************
******************************************************************
JQUERY SCROLL TO PLUGIN
******************************************************************
******************************************************************
*/
$.fn.scrollTo = function( target, options, callback ){
	if(typeof options == 'function' && arguments.length == 2){ callback = options; options = target; }
		var settings = $.extend({
			scrollTarget : target,
			offsetTop    : 50,
			duration     : 500,
			zoom         : 100,
			easing       : 'swing'
		}, options);
		return this.each(function(){
			var scrollPane = $(this);
			var scrollTarget = (typeof settings.scrollTarget == "number") ? settings.scrollTarget : $(settings.scrollTarget);
			if(typeof settings.scrollTarget != "number"){
				var scrollYTop = scrollTarget.offset().top * settings.zoom / 100;
			}
			var scrollY = (typeof scrollTarget == "number") ? scrollTarget : scrollYTop + scrollPane.scrollTop() - parseInt(settings.offsetTop);
			scrollPane.animate({scrollTop : scrollY }, parseInt(settings.duration), settings.easing, function(){
			  if (typeof callback == 'function') { callback.call(this); }
		});
	});
}