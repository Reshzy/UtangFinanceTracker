<?php

namespace App\Enums;

enum WalletType: string
{
    case Cash = 'cash';
    case GCash = 'gcash';
    case Maya = 'maya';
    case Bank = 'bank';
}
