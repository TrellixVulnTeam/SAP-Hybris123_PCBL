import { ISeComponent } from 'smarteditcommons/di';
/**
 * **Deprecated since 2005, use {@link MoreTextComponent}.**
 *
 * The component for truncating strings and adding an ellipsis.
 * If the limit is less then the string length then the string is truncated and 'more'/'less' buttons
 * are displayed to expand or collapse the string.
 *
 * ### Parameters
 *
 * `text` - see [text]{@link MoreTextComponent#text}.
 * `limit` - see [limit]{@link MoreTextComponent#limit}.
 * `moreLabelI18nKey` - see [moreLabelI18nKey]{@link MoreTextComponent#moreLabelI18nKey}.
 * `lessLabelI18nKey` - see [lessLabelI18nKey]{@link MoreTextComponent#lessLabelI18nKey}.
 * `ellipsis` - see [ellipsis]{@link MoreTextComponent#ellipsis}.
 *
 * @deprecated
 */
export declare class YMoreTextComponent implements ISeComponent {
}
