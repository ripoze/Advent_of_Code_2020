var data = require('fs').readFileSync('input.txt', 'utf8')

let passports = []
data = data
    .split('\n\n')
    .map(row => row.split(/\s/))
    .map(row => {
        let passport = {}
        row.map(item => {
            fields = item.match(/(\w+):(\S+)/)
            if (fields && fields[1] && fields[2]) passport[fields[1]] = fields[2]
        })
        passports.push(passport)
    })


console.log(`Part 1: ${countValidPassports_Pt1(passports)}`) //233
console.log(`Part 2: ${countValidPassports_Pt2(passports)}`) //111


function countValidPassports_Pt1(data) {
    //Part1

    // byr (Birth Year)
    // iyr (Issue Year)
    // eyr (Expiration Year)
    // hgt (Height)
    // hcl (Hair Color)
    // ecl (Eye Color)
    // pid (Passport ID)
    // cid (Country ID)

    data = data.filter(passport => {
        if (
            'byr' in passport &&
            'iyr' in passport &&
            'eyr' in passport &&
            'hgt' in passport &&
            'hcl' in passport &&
            'ecl' in passport &&
            'pid' in passport

        ) return true

        return false
    })
    return data.length
}

function countValidPassports_Pt2(data) {
    //Part 2
    
    // byr (Birth Year) - four digits; at least 1920 and at most 2002.
    // iyr (Issue Year) - four digits; at least 2010 and at most 2020.
    // eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
    // hgt (Height) - a number followed by either cm or in:
    // If cm, the number must be at least 150 and at most 193.
    // If in, the number must be at least 59 and at most 76.
    // hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
    // ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
    // pid (Passport ID) - a nine-digit number, including leading zeroes.
    // cid (Country ID) - ignored, missing or not.
    
    data = data.filter(p => {
        if (!p.hasOwnProperty('byr')) return false
        if (!p.hasOwnProperty('iyr')) return false
        if (!p.hasOwnProperty('eyr')) return false
        if (!p.hasOwnProperty('hgt')) return false
        if (!p.hasOwnProperty('hcl')) return false
        if (!p.hasOwnProperty('ecl')) return false
        if (!p.hasOwnProperty('pid')) return false
        if (p['byr'] < 1920 || p['byr'] > 2002) return false
        if (p['iyr'] < 2010 || p['iyr'] > 2020) return false
        if (p['eyr'] < 2020 || p['eyr'] > 2030) return false
        if (!p['hcl'].match(/#[a-z0-9]{6}$/)) return false
        if (!['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(p['ecl'])) return false
        if (!p['pid'].match(/^\d{9}$/)) return false
        h = p['hgt'].match(/^(\d+)(cm|in)$/)
        if (!h) return false
        if (h[2] == 'cm' && (h[1] < 150 || h[1] > 193)) return false
        if (h[2] == 'in' && (h[1] < 59 || h[1] > 76)) return false
        return true
    })
    return data.length
}