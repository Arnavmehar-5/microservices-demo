/*
 Copyright 2020 Google LLC

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/

package main

import (
	"strings"
	"testing"
)

func TestProductMatchesQuery(t *testing.T) {
	tests := []struct {
		name        string
		productName string
		query       string
		want        bool
	}{
		{name: "empty query", productName: "Watch", query: "", want: true},
		{name: "whitespace-only query", productName: "Watch", query: " \t\n ", want: true},
		{name: "case-insensitive match", productName: "Watch", query: "WATCH", want: true},
		{name: "sun partial match", productName: "Sunglasses", query: "sun", want: true},
		{name: "no match", productName: "Watch", query: "xyz123", want: false},
		{name: "trim leading and trailing spaces", productName: "Tank Top", query: "  tank  ", want: true},
		{name: "query truncated after 100 runes", productName: strings.Repeat("a", 100), query: strings.Repeat("a", 100) + "unmatched", want: true},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := productMatchesQuery(tt.productName, tt.query); got != tt.want {
				t.Errorf("productMatchesQuery(%q, %q) = %t, want %t", tt.productName, tt.query, got, tt.want)
			}
		})
	}
}


func TestNormalizeSearchQueryTruncatesByRunes(t *testing.T) {
    query := strings.Repeat("τòî", maxSearchQueryRunes+5)
    got := normalizeSearchQuery(query)

    want := string([]rune(query)[:maxSearchQueryRunes])
    if got != want {
        t.Errorf(
            "normalizeSearchQuery() returned %d runes, want %d",
            len([]rune(got)),
            maxSearchQueryRunes,
        )
    }
}

