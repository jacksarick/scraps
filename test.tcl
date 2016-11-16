#!/usr/bin/tclsh

proc exits {filename} {
	return [expr !! [catch {
		set infile [read [open $proot$index r]]
	} err]]
}

# assume everything is good
set flag 0

# read config
puts " - reading config.json"
set config [read [open "./config.json" r]]
set matchTuples [regexp -all -inline {\"[^\"]+\": ?\"?([^\"| |,]+)} $config]
lassign $matchTuples _ port _ proot _ dbroot _ usessl _ _ _ key _ cert

# check open port
puts "\n - checking to see if port $port is open"
if {[catch {
	set conn [socket localhost $port]
	puts $conn ping
	} err]} {
	
	puts " √ port's open"
} else {
	puts " X port's closed"
	set flag 1
}

# check read/write in db-root
puts "\n - checking read/write access in $dbroot"
set test_string "Sphinx of black quartz, judge my vow"
set filename "test-file.txt"
set outfile [open [concat $dbroot$filename] w]
puts $outfile $test_string
close $outfile

set infile [read [open $dbroot$filename r]]

if {[string trim $infile] == $test_string} {
	puts " √ read/write access in database directory"
} else {
	puts " X no read/write access in database directory"
	set flag 1
}

# check index & read access in page-root
puts "\n - checking read access in $proot"
set index "index.html"
if {[exits $proot$index]} {
	puts " √ page root looks good"
} else {
	puts " X no index.html found"
	set flag 1
}

# ask if we should check ssl certs
puts "\n ? check ssl certificate? \[y/n\]"
set confirm [gets stdin]
if {$confirm == y} {
	puts " - checking ssl certificate"
	if {[exits $key] && [exits $cert]} {
		
		puts " √ key/cert pair found"

		set pubcheck [exec openssl x509 -in $cert -modulus -noout]
		set keycheck [exec openssl rsa -in $key -modulus -noout]

		if {$pubcheck == $keycheck} {
			puts " √ key/cert pair checks out"
		} else {
			puts " X key/cert pair fails. Maybe regenerate them?"
		}

	} else {
		puts " X missing key/cert pair. Generate local ones with ./gen-cert.sh"
	}
}

# general diagnostic
if {$flag == 0} {
	puts "\n √ all clear!"
} else {
	puts "\n X something is wrong..."
}