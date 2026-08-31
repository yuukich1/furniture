package repositories

import (
	"database/sql"
	"errors"

	"furniture/internal/domain"

	"github.com/jackc/pgx/v5/pgconn"
)

func handleDBError(err error) error {
	if err == nil {
		return nil
	}

	if errors.Is(err, sql.ErrNoRows) {
		return domain.ErrNotFound
	}

	var pgErr *pgconn.PgError
	if errors.As(err, &pgErr) {
		switch pgErr.Code {
		case "23505":
			return domain.ErrAlreadyExists

		case "23503":
			return domain.ErrInvalidInput
		}
	}

	return err
}
