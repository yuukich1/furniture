package repositories

import "fmt"

func addPagination(query string, args []any, limit, offset *int) (string, []any) {
	if limit != nil {
		query += fmt.Sprintf(` LIMIT $%d`, len(args)+1)
		args = append(args, *limit)
	}

	if offset != nil {
		query += fmt.Sprintf(` OFFSET $%d`, len(args)+1)
		args = append(args, *offset)
	}

	return query, args
}
