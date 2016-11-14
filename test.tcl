#!/usr/bin/tclsh

set flag 0

# read config
set config [read [open "./config.json" r]]
set matchTuples [regexp -all -inline {\"[^\"]+\": ?\"?([^\"| |,]+)} $config]
lassign $matchTuples _ port _ proot _ dbroot

# check open port
if {[catch {
	set conn [socket localhost $port]
	puts $conn ping
	} err]} {
	
	puts "Port's open"
} else {
	puts "ERROR: Port's closed"
	set flag 1
}

# check read/write in db-root
set test_string "Sphinx of black quartz, judge my vow"
set filename "test-file.txt"
set outfile [open [concat $dbroot$filename] w]
puts $outfile $test_string
close $outfile

set infile [read [open $dbroot$filename r]]

if {[string trim $infile] == $test_string} {
	puts "read/write access in database directory"
} else {
	puts "ERROR: no read/write access in database directory"
	set flag 1
}

# check index & read access in page-root
set index "index.html"
if {[catch {
	set infile [read [open $proot$index r]]
	} err]} {
	
	puts "ERROR: no index.html found"
	set flag 1

} else {
	puts "page root looks good"
}

# general diagnostic
if {$flag == 0} {
	puts "all clear!"
} else {
	puts "something is wrong..."
}